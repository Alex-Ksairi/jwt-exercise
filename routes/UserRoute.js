const express = require('express');
const router = express.Router();
const Controller = require('../controllers/UserController')

router.post('/register', Controller.registerUser);
router.post('/login', Controller.loginUser);

module.exports = router;
