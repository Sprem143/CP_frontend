const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    tagName:{
      type:String,
      unique:true
    },
 data:{
    centerName:{type:String},
    mobileNumber:{type:Number},
    logo1:String,
    logo2:String
 },
 logo1:String,
 logo2:String
});



module.exports = mongoose.model('Header',HeaderSchema);
