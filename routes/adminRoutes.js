const express = require('express');
const {login, logout, verifyToken,getadmins,getadmin, updateContent } = require('../controllers/adminController');
const authenticateJWT = require('../middleware/authenticate');
const router = express.Router();

router.post('/login', login);
// router.get('/user', authenticateJWT, getUser);
router.post('/logout', logout);
router.post('/verifyToken',authenticateJWT, verifyToken);
router.get('/getadmins', getadmins);
router.post('/getadmin', getadmin);
router.post('/updateContent', updateContent);

module.exports = router;
