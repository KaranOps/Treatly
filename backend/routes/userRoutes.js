const express = require('express');
const router = express.Router();

const {registerUser,loginUser} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

module.exports = userRouter