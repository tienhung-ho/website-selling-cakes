const uploadToCloud = require('../../helpers/uploadToCloud') 

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    console.log('upload');
    const result = await uploadToCloud(req.file.buffer);
    req.body[req.file.fieldname] = result
    console.log(result);
  }
  next()
}


