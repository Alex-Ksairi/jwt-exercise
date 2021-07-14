const passport = require('passport');
const express = require('express');
const router = express.Router();

const controller = require('../controllers/TeaController');

router.get('/list', passport.authenticate('jwt', { session: false }), controller.list);


module.exports = router;