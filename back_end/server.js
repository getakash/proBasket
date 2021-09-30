import express from "express"
import path from "path"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import products from "./data/products.js"
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {errorHandler, routeNotFound} from './middlewares/errorMW.js'

var app = express();

dotenv.config();

connectDB();

// routes middlewares
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/front_end/build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))
    })
}else{
    app.get('/', (req,res) => {
        res.send('API is running...')
    })
}


// error middlewares

app.use(routeNotFound);
app.use(errorHandler);


app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server Started in ${process.env.NODE_ENV} mode`);
})
