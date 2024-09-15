const express = require('express');
const { updatenotification,getnotification, undochange, updatedp, updatename, updatepassword, checkpassword, register,saregister,getsuperadmin, login, getUser, verifyToken, removeadmin, deactivate,activate, getupdates } = require('../controllers/superAdminController');
const authenticateJWT = require('../middleware/authenticate');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage });


router.post('/register',register);
router.post('/saregister', saregister);
router.post('/login', login);
router.get('/user', authenticateJWT, getUser);
router.get('/getupdates', getupdates);
router.get('/getsuperadmin',getsuperadmin);
router.post('/verifyToken',authenticateJWT, verifyToken);
router.post('/removeadmin',removeadmin);
router.post('/deactivate',deactivate);
router.post('/activate',activate);
router.post('/checkpassword',checkpassword);
router.put('/updatepassword',authenticateJWT,updatepassword);
router.put('/updatename',authenticateJWT,updatename);
router.put('/undochange',undochange);
router.post('/updatedp',updatedp);
router.put('/updatenotification',updatenotification);
router.get('/getnotification',getnotification);


module.exports = router;
