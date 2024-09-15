const mongoose = require('mongoose');

const connectDB = async () => {
  
  const DB= "mongodb+srv://prem:Prem650019@cluster0.1vv64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  mongoose.connect(DB).then(()=>{
      console.log("database connected")
  }).catch((err)=>console.log(err))
};

module.exports = connectDB;
