const { type } = require('jquery');
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    page:{
      type:String,
      unique:true
    },
 data:{
    hh1:String,
    hh2:String,
    hh3:String,
    hh4:String,
    hh5:String,
    hh6:String,
    hh7:String,
    hh8:String,

    hp1:String,
    hp2:String,
    hp3:String,
    hp4:String,
    hp5:String,
    hp6:String,
    hp7:String,
 }
});



module.exports = mongoose.model('Home',HomeSchema);
