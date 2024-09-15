const Admin = require('../models/Admin');
const Update = require('../models/Update');
const Home = require('../models/Home')
const Superadmin = require('../models/Superadmin')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const secret = 'mysecret';
const bcrypt = require('bcryptjs')
const multer = require('multer');
const Notification = require('../models/notification');
const cloudinary = require('cloudinary').v2;
const storage = multer.diskStorage({});
const upload = multer({ storage });
// ---------node mailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'premcschariraha@gmail.com',
    pass: 'odwr nbkz rqva whgd',
  },
});

exports.getsuperadmin = async (req, res) => {
  try {
    let result = await Superadmin.find();
    result = result[0];
    res.json({ result });
  } catch (err) {
    console.log(err)
    res.json({ message: 'Internal Server Error' })
  }
}

exports.verifyToken = async (req, res) => {
  try {
    res.json({ auth: true })
  } catch (err) {
    res.json({ message: 'Error while authenticating' })
  }
}

exports.updatedp = async (req, res) => {
  try {

    let file = req.files.newdp;
    const publicid1 = req.files.md5;
    // console.log(file);
    cloudinary.uploader.upload(file.tempFilePath, { public_id: publicid1 }, async (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send("Error uploading logo1");
      }
      console.log(result);
      var autoCropUrl = cloudinary.url(result.public_id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
      });
      console.log(autoCropUrl)
      let resu = await Superadmin.findOneAndUpdate(
        { name: 'superadmin' },
        { $set: { imgUrl: autoCropUrl } },
        { new: true }
      );
      if (resu) {
        res.status(200).json({ status: true })
      }
    });
  } catch (err) {
    console.log(err)
  }
};

exports.register = async (req, res) => {
  const { adminName, email, mobile, password } = req.body;
    try {
     
    let imgurl= req.files.imgUrl
    const publicid1 = req.files.md5;
    console.log(imgurl);
    cloudinary.uploader.upload(imgurl.tempFilePath, { public_id: publicid1 }, async (err, result) => {
      console.log(result);
      if (err) {
        console.log(err)
        return res.status(500).send("Error uploading logo1");
      }
      console.log(result);
      var imgUrl = cloudinary.url(result.public_id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
      });
      console.log(imgUrl)
      const newUser = new Admin({ adminName, email, mobile, password,imgUrl });
      // chek if email already exist
      let existingEmail = await Admin.findOne({ email: email });
      if (existingEmail) {
        return res.json({ message: "Email already exist" })
      }
      // check if mobile already exist
      let existingMobile = await Admin.findOne({ email: email });
      if (existingMobile) {
        return res.json({ message: "Mobile already exist" })
      }
      let resul = await newUser.save();
      res.status(200).json({ message: "Admin Added Successfully" });
      if (resul) {
        const mailOptions = {
          from: 'premcschariraha@gmail.com', // Sender address
          to: email,                         // Receiver's email address
          subject: 'Prem Common Service Center',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h3 {
                color: red;
                text-align: center;
              }
              p {
                font-size: 16px;
                color: #333333;
              }
              .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #666666;
                border-top: 1px solid #eeeeee;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h3>Welcome To Prem Common Service Center</h3>
              <p>Dear ${adminName},</p>
              <p>We are excited to have you on board. Explore our services and enjoy the benefits we offer.</p>
              <p>username: ${email}</p>
              <p>password: ${password}</p>
              <p>If you have any questions, feel free to reach out to us at any time.</p>
              <p>Best regards,</p>
              <p>The Prem Common Service Center Team</p>
              <div class="footer">
                <p>&copy; 2024 Prem Common Service Center. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Email sent: ' + info.response);
        });

      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err });
  }
};

// -----------super admin registration---------
exports.saregister = async (req, res) => {
  const { email } = req.body;
  try {
    const newUser = new Superadmin(req.body);
    // chek if email already exist
    let existingEmail = await Superadmin.findOne({ email: email });
    if (existingEmail) {
      return res.json({ message: "Email already exist" })
    }
    // check if mobile already exist
    let existingMobile = await Superadmin.findOne({ email: email });
    if (existingMobile) {
      return res.json({ message: "Mobile already exist" })
    }
    await newUser.save();
    res.status(200).json({ message: "Super Admin Added Successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err });
  }
};

exports.removeadmin = async (req, res) => {
  try {
    let { email } = req.body;
    let result = await Admin.findOneAndDelete({ email: email });
    if (result) {
      return res.staus(200).json({ message: "Admin removed Successfully" })
    }
  } catch (err) {
    res.json({ message: err })
  }
}

exports.deactivate = async (req, res) => {
  try {
    const { email } = req.body;
    let result = await Admin.findOneAndUpdate(
      { email: email },
      { $set: { 'isActive': false } },
      { new: true }
    )
    if (result) {
      return res.status(200).json({ message: 'Admin Deactivated' })
    }
  } catch (err) {
    console.log(err);
    res.json({ message: 'Internal Error' })
  }
}

exports.activate = async (req, res) => {
  try {
    const { email } = req.body;
    let result = await Admin.findOneAndUpdate(
      { email: email },
      { $set: { 'isActive': true } },
      { new: true }
    )
    if (result) {
      return res.status(200).json({ message: 'Admin Deactivated' })
    }
  } catch (err) {
    console.log(err);
    res.json({ message: 'Internal Error' })
  }
}

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await Superadmin.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.checkpassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await Superadmin.findOne({ name: 'superadmin' });
    if (!user) {
      return res.status(400).json({ status: false });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: false });
    }
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server Error" })
  }
}


exports.updatepassword = async (req, res) => {
  try {
    const { newPass, oldPass } = req.body;
    console.log(oldPass, newPass);

    // Find the user
    let user = await Superadmin.findOne({ name: 'superadmin' });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the old password with the stored password
    const match = await user.comparePassword(oldPass) // <-- Await here
    if (!match) {
      return res.status(400).json({ message: 'Incorrect Old Password' });
    }

    user.password = newPass;
    await user.save();
    // Respond to the client
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
    console.log(err);
  }
};

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.getupdates = async (req, res) => {
  try {
    let result = await Update.find();
    res.status(200).json({ result })
  } catch (err) {
    res.json({ message: 'Internal Error' })
    console.log(err);
  }
}
exports.updatename = async (req, res) => {
  try {
    const { name } = req.body;
    let result = await Superadmin.findOneAndUpdate(
      { name: 'superadmin' },
      { $set: { name: name } },
      { new: true }
    );
    if (result) {
      res.status(200).json({ message: 'Name updated successfully' })
    }
  } catch (err) {
  }
};

exports.undochange = async (req, res) => {
  try {
    const { id, page, cid } = req.body;
    let result = await Update.findById(id);
    if (result) {
      let oldData = result.oldData;
      if (result.page == 'home') {
        let updateResult = await Home.findOneAndUpdate(
          { page: 'home' },
          { $set: { [`data.${cid}`]: oldData } },
          { new: true }
        )
        console.log(updateResult);
        if (updateResult) {
          await Update.findByIdAndDelete(id);
          res.status(200).json({ status: true });
        }
      }
      // -- update page---
    }
  } catch (err) {
    console.log(err);
    res.json({ message: 'Internal Server error' })
  }
}

exports.getnotification=async(req,res)=>{
  try{
   let result= await Notification.find();
   let newResult= result.filter((r)=>r.new==true); 
   let oldResult= result.filter((r)=>r.new==false); 
  //  console.log(result);
   res.status(200).json({old:oldResult,new:newResult});
  }catch(err){
    console.log(err);
    res.json({message:'Internal server error'})
  }
}

exports.updatenotification=async(req,res)=>{
  try{
    console.log("update noiric")
        let notifications= await Notification.find();
        notifications=notifications.filter((notification)=>notification.new==true);
        notifications.map(async(notification)=>{
          await Notification.findOneAndUpdate(
              {_id:notification._id},
              {$set: {new:false}},
              {new:true}
          )
        })   
  }catch(err){
    console.log(err);
    res.status(401).json({message:'Internal server error'})
  }
}
