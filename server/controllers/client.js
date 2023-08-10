import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // get all products

    // get the product stats of each PRODUCT
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          // combine product + productState into one object to return
          ...product._doc, // all the product information (._doc because of the Promise)
          stat, // stat info
        };
      })
    );

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
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query; // grab values from a query string sent from the front-end

    // formatted sort should look like { userId: -1 } // we want to format it so that mongodb can read it
    const generateSort = () => {
      const sortParsed = JSON.parse(sort); // parse the string sent from the front-end to an object
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {}; // check if sort exists or not - if yes, format it

    // transaction search into the MongoDB
    // we are checking the cost field using the search field that the user provides
    // so we're searching the cost field of all transactions in the database
    // the "$or" allows us to search multiple fields, in this case, cost and userID
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted) // so ascending or descending???
      .skip(page * pageSize) // skip to the proper page (page=2, pageSize=20 => we skip to document 40)
      .limit(pageSize); // how many results to show

    const total = await Transaction.countDocuments({
      // total # of transactions in the database
      name: { $regex: search, $options: "i" },
    });

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
    res.status(201).json(savedProduct); // 201: something has been created - return the response to front-end (savedProduct - json format) for further use
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
