const Header = require('../models/Header');
const cloudinary = require('cloudinary').v2;

//  cloudinary (file upload) setup------
// (async function() {

// Configuration
cloudinary.config({
  cloud_name: 'dfnzn3frw',
  api_key: '555792415844786',
  api_secret: 'ak9AXe2hL5LtbhWId4YRiGjSjD0' // Click 'View API Keys' above to copy your API secret
});


//  const uploadResult = await cloudinary.uploader
//    .upload(
//        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//            public_id: 'shoes',
//        }
//    )
//    .catch((error) => {
//        console.log(error);
//    });
// console.log(uploadResult);

// Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto'
// });
// console.log(optimizeUrl);     
// })();


// ----function------------
exports.uploadLogo = async (req, res) => {
  try {
    var file;
    if (req.files.logo1) {
      file = req.files.logo1;
      const publicid1= req.files.md5;
      cloudinary.uploader.upload(file.tempFilePath, { public_id:publicid1 }, async (err, result) => {
        if (err) {
          return res.status(500).send("Error uploading logo1");
        }
        //  console.log(`Original url ${result}`) 
        let autoCropUrl = cloudinary.url(result.public_id, {
          crop: 'auto',
          gravity: 'auto',
          width: 500,
          height: 500,
        });
        // console.log(`auto url ${autoCropUrl}`);    
        if (autoCropUrl) {
          await Header.findOneAndUpdate(
            { tagName: 'header' },
            { $set:{ 'data.logo1': autoCropUrl } },
            { new: true }
          );
          res.json({status:true, message:'Logo1 updated successfully'})
        } else {
          res.json({status:false, message:"Failed to get URL for logo1"});
        }
      });
    } else if (req.files.logo2) {
      file = req.files.logo2;
      const publicid2= req.files.md5;
      cloudinary.uploader.upload(file.tempFilePath, { public_id:publicid2 }, async (err, result) => {
        if (err) {
          return res.status(500).send("Error uploading logo2");
        }
        //  console.log(result.url) 
        let autoCropUrl = cloudinary.url(result.public_id, {
          crop: 'auto',
          gravity: 'auto',
          width: 800,
          height: 500,
        });
        // console.log(autoCropUrl);    
        if (autoCropUrl) {
          await Header.findOneAndUpdate(
            { tagName: 'header' },
            { $set: { 'data.logo2': autoCropUrl } },
            { new: true }
          );
          res.json({status:true, message:'Logo2 updated successfully'})
        } else {
          res.send("Failed to get URL for logo2");
        }
      });
    } else {
      res.status(400).send("No logo file provided");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
exports.addContent = async (req, res) => {
  try {
    let { tagName, data } = req.body;
    let header = new Header({ tagName, data });
    const result = await header.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getCenterName = async (req, res) => {
  try {
    let result = await Header.findOne({ tagName: 'header' });
    res.status(200).json({ centerName: result.data });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editCenterName = async (req, res) => {
  try {
    let Data = await Header.findOne({ tagName: 'header' });
    if (!Data) {
      return res.status(404).json({ message: 'Data Not found' });
    }

    if (req.body.centerName) {
      await Header.findOneAndUpdate(
        { tagName: 'header' },
        { $set: { 'data.centerName': req.body.centerName } },
        { new: true }
      );
    }

    if (req.body.mobileNumber) {
      await Header.findOneAndUpdate(
        { tagName: 'header' },
        { $set: { 'data.mobileNumber': req.body.mobileNumber } },
        { new: true }
      );
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
