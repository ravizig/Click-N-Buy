import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors'

dotenv.config();

const port = process.env.PORT;

const app = express();



// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(morgan("dev"))

connectDb()


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


app.get("/", (req, res) => {
    res.send("<h1> Hello World </h1>")
})


app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}/`);
}) 
