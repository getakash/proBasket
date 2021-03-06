import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import products from "./data/products.js"
import users from "./data/users.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"

dotenv.config();

connectDB();

const importData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id

        const sampleProducts = products.map((p) => {
            return {...p, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log('data imported')

        process.exit();
    }
    catch(error){
        console.log(error);

        console.log('data destroyed')
        process.exit(1);
    }
}
const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        process.exit();
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}