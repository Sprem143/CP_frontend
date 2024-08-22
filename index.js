const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({
  origin: true,
  methods: ["POST", "PUT", "DELETE", "GET"],
  credentials: true
}));
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const headerRoutes = require('./routes/headerRoutes');
const fileUpload= require('express-fileupload')

connectDB();

app.use(fileUpload({
  useTempFiles:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/header', headerRoutes);
app.use('/home', homeRoutes);
// file upload



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
