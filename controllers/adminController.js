const Admin = require('../models/Admin');
const Home=require('../models/Home');
const Update= require('../models/Update')
const jwt = require('jsonwebtoken');
const secret = 'mysecret';
const Notification= require('../models/notification')

exports.verifyToken= async(req, res)=>{
  try{
     res.json({auth:true})
  }catch(err){
   res.json({message:'Error while authenticating'})
  }
}

exports.getadmins=async(req,res)=>{
  try{
    const admins = await Admin.find(); 
    res.status(200).send({admins:admins})
  }catch(err){
   console.log(err)
  }
}

exports.login = async (req, res) => {
  const { adminName, password } = req.body;
  try {
    const user = await Admin.findOne({ adminName });
    if (!user) {
      return res.status(400).json({message:'User not found'});
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({message:'Invalid credentials'});
    }
    const token = jwt.sign({ id: user._id,username: user.username }, secret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getadmin = async(req, res) => {
  try{
   const {adminName}= req.body;
   let result=await Admin.findOne({adminName:adminName});
   res.status(200).json({result})
  }catch(err){
    console.log(err);
    res.json({message:"internal error"})
  }
};

// ----update content----------
exports.updateContent = async (req, res) => {
  try {
    let old= await Home.findOne({page:'home'});
    const { content, id, admin,page } = req.body;
    const oldData= old.data[id];
    let updateField = `data.${id}`; 
    let result = await Home.findOneAndUpdate(
      { page: 'home' }, 
      { $set: { [updateField]: content } }, 
      { new: true }
    );
    // console.log("Result:", result);
    if (!result) {
      return res.status(404).json({ ok: false, message: 'Document not found or no matching field' });
    }
    // ------get old data--------
    const date= new Date().toLocaleString();
    const updatedBy= admin;
    const newData=content;
    const newUpdate= new Update({updatedBy,date,page,id,oldData,newData});
    await newUpdate.save();
    res.status(200).json({ ok: true, message: 'Content updated' });

    // ------push notification-----
    const notification= new Notification({updatedBy,page,date,oldData,newData});
    await notification.save();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({message:'Successfully logged out'});
};
