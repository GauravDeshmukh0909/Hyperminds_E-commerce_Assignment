import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addToCart, getCart, updateCartItem, removeItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:id", protect, updateCartItem);
router.delete("/remove/:id", protect, removeItem);

export default router;
