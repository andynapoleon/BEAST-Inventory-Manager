import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  addProducts,
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/products", verifyToken, getProducts);
router.get("/customers", verifyToken, getCustomers);
router.post("/transactions", verifyToken, getTransactions);
router.get("/geography", verifyToken, getGeography);

router.post("/addProducts", verifyToken, addProducts);

export default router;
