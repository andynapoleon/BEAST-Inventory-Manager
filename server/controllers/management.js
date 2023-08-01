import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params; // grab the id

    // aggregation from mongo - used to process multiple documents in a PIPELINE - we can work with another collection as well
    // same with SQL Join
    //
    const userWithStats = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(
            id
          ) /* change id to _id (right mongo format) */,
        },
      },
      {
        $lookup: {
          from: "affiliatestats", // compare "_id" with userId in the affiliatestats table
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats", // store the info in here
        },
      },
      { $unwind: "$affiliateStats" }, // flatten the array because affiliateStats is an array
    ]);

    console.log(userWithStats);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
