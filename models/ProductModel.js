const mongoose = require('mongoose');

// Định nghĩa schema cho Product
const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      required: true,
   },
   bounty: {
      type: Number,
      required: true,
      min: 0
   },
   devil_fruit: {
      type: String,
      required: false,
   },
   crew: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: false,
   },
   characters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Characters' // Đổi tên tham chiếu thành 'Character'
   }
}, {
   versionKey: false
});

// Đăng ký model Product
const ProductModel = mongoose.model('Product', ProductSchema); // Đổi tên model thành 'Product'

module.exports = ProductModel;
