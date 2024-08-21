const Home = require('../models/Home');

exports.addContentToHome = async (req, res) => {
  try {
    let { tagName, data } = req.body;
    let home = new Home({ tagName, data });
    const result = await home.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getHomePageContent= async(req,res)=>{
  try{
    let data = await Home.findOne({tagName:'home'});
    res.status(200).send(data.data)
  }catch(err){
  res.status(201).send("error while loading data")
  }
}

exports.updateContent = async (req, res) => {
  try {
    const { content, id } = req.body;  // `id` would correspond to "about"
    console.log("Content:", content, "ID:", id);

    let updateField = `data.${id}`; // Dynamically create the field to update
    let result = await Home.findOneAndUpdate(
      { tagName: 'home' }, // Find the document with tagName 'home'
      { $set: { [updateField]: content } }, // Update the specific field within `data`
      { new: true }
    );

    console.log("Result:", result);

    if (!result) {
      return res.status(404).json({ ok: false, message: 'Document not found or no matching field' });
    }

    res.status(200).json({ ok: true, message: 'Content updated' });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};


