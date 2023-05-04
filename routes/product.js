const express = require('express');
const router = express.Router();
const {createProduct, updateProduct, getAllProducts, getSingleProduct, deleteProduct} = require('../controllers/product')
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('../middlewares/auth')


router.route('/product').post(createProduct)
router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getSingleProduct).put(verifyTokenAndAdmin,updateProduct).delete(deleteProduct)


module.exports = router