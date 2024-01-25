const mongoose = require('mongoose')

module.exports.connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log(`Data get successlly! ${process.env.MONGO_URL}`);
  } 
  catch (err) {
    console.log(`Can't get data from database!`);
  }
}

