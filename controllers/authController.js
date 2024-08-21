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
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).send('Successfully registered');
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  res.status(200).send('Successfully logged out');
};
