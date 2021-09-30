import express from 'express'
// import asyncHandler from 'express-async-handler'
// import Products from '../models/productModel.js'
import { getProducts, getProductById } from '../controllers/productControllers.js'

const router = express.Router()

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router