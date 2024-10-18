import express, { Router } from 'express';
import { getProduct,createProduct,updateProduct,deleteProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.post('/',createProduct)
router.delete('/:id',deleteProduct)

router.get('/',getProduct)

router.put('/:id',updateProduct)



export default router;