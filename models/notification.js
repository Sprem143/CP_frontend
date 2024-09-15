const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    updatedBy:String,
    date:String,
    page:String,
    id:String,
    oldData:String,
    newData:String,
    new:{
        type:Boolean,
        default:true
    }
});
module.exports = mongoose.model('Notification',NotificationSchema);
