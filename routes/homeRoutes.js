const express = require('express');
const {addContentToHome, getHomePageContent, updateContent} = require('../controllers/homeController');
const router = express.Router();

router.post('/addContentToHome', addContentToHome);
router.post('/updateContent', updateContent);
router.get('/getHomePageContent', getHomePageContent);


module.exports = router;
