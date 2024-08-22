const mongoose = require('mongoose');

const connectDB = async () => {
  
  const DB= "mongodb+srv://prem:Prem7366@cluster0.hmjxes4.mongodb.net/mernProject?retryWrites=true&w=majority&appName=Cluster0"
  mongoose.connect(DB).then(()=>{
      console.log("databse connected")
  }).catch((err)=>console.log(err))
};

module.exports = connectDB;
