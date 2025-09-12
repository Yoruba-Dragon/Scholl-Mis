const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const {protect}= require('../middleware/auth.middleware')

router.post('/login',protect, login);
router.post('/register',protect, register);

module.exports = router;
