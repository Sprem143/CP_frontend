const express = require('express');
const { register, login, getUser, logout, verifyToken } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticate');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticateJWT, getUser);
router.post('/logout', logout);
router.post('/verifyToken',authenticateJWT, verifyToken);

module.exports = router;
