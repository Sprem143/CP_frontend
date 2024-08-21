const { type } = require('jquery');
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    tagName:{
      type:String,
      unique:true
    },
 data:{
    heading:{type:String},
    about:{type:String},
    heading2:String,
    service:String
 }
});



module.exports = mongoose.model('Home',HomeSchema);
