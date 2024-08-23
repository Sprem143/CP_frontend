const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'mysecret';
const verifyToken= require('../middleware/authenticate');

exports.verifyToken= async(req, res)=>{
  try{
     res.json({auth:true})
  }catch(err){
   res.json({message:'Error while authenticating'})
  }
}

exports.register = async (req, res) => {
  const{username,password}= req.body;
  console.log("Function called")
  console.log(req.body)
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({message:"user created"});
  } catch (err) {
    res.status(500).json({err});
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({message:'User not found'})
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({message:'Invalid credentials'});
    }
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({err});
  }
};

exports.getUser = (req, res) => {
  res.json(req.user);
};

exports.logout = (req, res) => {
  res.status(200).json({message:'Successfully logged out'});
};
