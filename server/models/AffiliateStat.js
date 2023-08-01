import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" }, // one-to-one
    affiliateSales: {
      type: [mongoose.Types.ObjectId], // array of transactions - one-to-many
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;
