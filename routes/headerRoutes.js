const express = require('express');
const {
  addContent,
  getCenterName,
  editCenterName,
  uploadLogo
} = require('../controllers/headerController');
const router = express.Router();

router.post('/addContent', addContent);
router.get('/getCenterName', getCenterName);
router.post('/editCenterName', editCenterName);
router.post('/uploadLogo', uploadLogo);

module.exports = router;
