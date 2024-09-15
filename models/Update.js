const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
    updatedBy:String,
    date:String,
    page:String,
    id:String,
    oldData:String,
    newData:String
});
module.exports = mongoose.model('Update',UpdateSchema);
