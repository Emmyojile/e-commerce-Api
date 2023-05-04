const express = require('express');
const router = express.Router();
const {updateOrder,createOrder, deleteOrder, getUserOrders, getAllOrders,getIncome} = require('../controllers/order')
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('../middlewares/auth')


router.route('/').post(verifyToken,createOrder).get(verifyTokenAndAdmin,getAllOrders)
router.route('/:id').put(verifyTokenAndAdmin, updateOrder).delete(verifyTokenAndAdmin, deleteOrder)
router.route('/:userId').get(verifyTokenAndAuth,getUserOrders)
router.route('/income').get(verifyTokenAndAdmin, getIncome)

module.exports = router