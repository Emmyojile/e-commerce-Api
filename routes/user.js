const express = require('express');
const { allUsers,getSingleUser,updateUser,deleteUser,userStats } = require('../controllers/user');
const router = express.Router();
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('../middlewares/auth')

router.route('/').get(verifyTokenAndAdmin, allUsers)
router.route('/stats').get(verifyTokenAndAdmin, userStats)
router.route('/:username').get(verifyTokenAndAdmin, getSingleUser);
router.route('/:id').put(verifyTokenAndAuth,updateUser).delete(deleteUser)


module.exports = router