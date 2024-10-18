import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/connectDB.js';

import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import {authenticate} from './middleware/auth.middleware.js';
import errorHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded());
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use(authenticate)
app.use(errorHandler)
app.use(cookieParser())


app.listen(PORT,()=>{
  connectDB();
  console.log(`Server started at Port ${PORT}`)
})




