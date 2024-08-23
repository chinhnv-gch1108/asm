const mongoose = require('mongoose');

// Định nghĩa schema cho SportsProduct
const SportsSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
      min: 0
   },
   price: {
      type: Number,
      required: true,
      min: 0
   },
   image: {
      type: String,
      required: false,
   }
}, {
   versionKey: false
});

// Đăng ký model SportsProduct
const SportsModel = mongoose.model('sports', SportsSchema);

module.exports = SportsModel;
