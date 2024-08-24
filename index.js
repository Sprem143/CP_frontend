const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose= require('mongoose')
app.use(cors({
  origin: true,
  methods: ["POST", "PUT", "DELETE", "GET"],
  credentials: true
}));

// const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const headerRoutes = require('./routes/headerRoutes');
const fileUpload= require('express-fileupload')

// connectDB();
const DB= "mongodb+srv://prem:Prem650019@cluster0.6snqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  mongoose.connect(DB).then(()=>{
      console.log("databse connected")
  }).catch((err)=>console.log(err))

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



const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
