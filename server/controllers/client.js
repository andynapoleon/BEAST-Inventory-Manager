import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const productsWithStats = await Product.aggregate([
      {
        $addFields: {
          _id: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "productstats",
          localField: "_id",
          foreignField: "productId",
          as: "stat",
        },
      },
      {
        $unwind: {
          path: "$stat",
        },
      },
    ]);
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password"); // we don't want to send the password to the front-end
    res.status(200).json(customers); // send an array of customers to the front-end
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"} from the front-end
    const { search = "" } = req.query; // grab values from a query string sent from the front-end
    const { paginationModel, sortModel } = req.body;

    //console.log("MODEL", paginationModel);
    //console.log("SORT", sortModel);
    var values = [];
    if (sortModel !== undefined) {
      values = Object.values(sortModel);
    }
    // const values = Object.values(sortModel);

    // formatted sort should look like { userId: -1 } // we want to format it so that mongodb can read it
    const generateSort = () => {
      var sortFormatted = {};
      var value = 0;
      if (sortModel !== undefined) {
        if (values[1] === "asc") {
          value = 1;
        } else {
          value = -1;
        }
        sortFormatted = {
          [values[0]]: value,
          //[sortModel.field]: (sortModel.sort = "asc" ? 1 : -1),
        };
      }

      return sortFormatted;
    };
    const sortFormatted = Boolean(sortModel) ? generateSort() : {}; // check if sort exists or not - if yes, format it
    //console.log("SORT FORMAT:", sortFormatted);

    // transaction search into the MongoDB
    // we are checking the cost field using the search field that the user provides
    // so we're searching the cost field of all transactions in the database
    // the "$or" allows us to search multiple fields, in this case, cost and userID

    // console.log("PAGE:", paginationModel.page);
    // console.log("PAGESIZE:", paginationModel.pageSize);

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted) // so ascending or descending???
      .skip(paginationModel.page * paginationModel.pageSize) // skip to the proper page (page=2, pageSize=20 => we skip to document 40)
      .limit(paginationModel.pageSize); // how many results to show

    // console.log(transactions);
    // console.log(transactions.length);

    const total = await Transaction.estimatedDocumentCount({
      // total # of transactions in the database
      name: { $regex: search, $options: "i" },
    });

    // console.log(total);

    res.status(200).json({
      transactions, // requested transactions
      total, // # of total documents
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {}); // dictionary of countries as keys and # of users in that country as values

    // array of converted JSON objects
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProducts = async (req, res) => {
  try {
    const { name, price, description, category, rating, supply } = req.body; // obtain the registered info from the front-end (req.body)

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      rating,
      supply,
    });
    const savedProduct = await newProduct.save();

    const productId = savedProduct._id;

    const newProductStat = new ProductStat({
      productId,
      yearlySalesTotal: 0,
      yearlyTotalSoldUnits: 0,
      year: new Date().getFullYear(),
      monthlyData: [],
      dailyData: [],
    });
    const savedProductStat = await newProductStat.save();

    res
      .status(201)
      .json({ product: savedProduct, productStat: savedProductStat }); // 201: something has been created - return the response to front-end (savedProduct - json format) for further use
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
