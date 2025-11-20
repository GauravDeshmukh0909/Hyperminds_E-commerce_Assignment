import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from "../db/index.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from "../routes/authRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";

// import products from "./productsData.js";
// import {Product} from "../models/product.js";


dotenv.config();


// const seedProducts = async () => {
//   try {
//     await connectMongoDB();

//     console.log("Connected to MongoDB");

//     await Product.deleteMany();
//     console.log("Old products removed");

//     await Product.insertMany(products);
//     console.log("New products added successfully!");

//     process.exit();
//   } catch (error) {
//     console.error("Seeding Error:", error);
//     process.exit(1);
//   }
// };

// seedProducts();



const app=express();
const PORT=process.env.PORT||8000;

// ✅ CORS FIX
// ------------------------
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // frontend URL from env
    credentials: true,                // allow cookies, tokens
  })
);

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
    connectMongoDB();
});


