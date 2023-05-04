const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/auth')



router.route('/reg').post(register);
router.route('/log').post(login);








module.exports = router