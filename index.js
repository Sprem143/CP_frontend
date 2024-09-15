const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const superAdminRoutes= require('./routes/superAdminRouter')
const homeRoutes = require('./routes/homeRoutes');
const headerRoutes = require('./routes/headerRoutes');
const fileUpload= require('express-fileupload');
const nodemailer = require('nodemailer');

const app = express();
connectDB();

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors({
  origin: true,
  methods: ["POST", "PUT", "DELETE", "GET"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use('/superadmin', superAdminRoutes);
app.use('/header', headerRoutes);
app.use('/home', homeRoutes);
// file upload



const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
