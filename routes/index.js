var express = require('express');
var router = express.Router();

var ProductModel = require('../models/ProductModel'); // Đảm bảo đường dẫn đúng

// Dữ liệu mẫu để render trong template Handlebars
const carouselImages = [
  { src: '/images/carousel1.jpg', alt: 'Carousel Image 1' },
  { src: '/images/carousel2.jpg', alt: 'Carousel Image 2' },
  { src: '/images/carousel3.jpg', alt: 'Carousel Image 3' }
];

const products = [
  { name: 'Product 1', price: '$10', image: '/images/product1.jpg', alt: 'Product 1' },
  { name: 'Product 2', price: '$20', image: '/images/product2.jpg', alt: 'Product 2' },
  { name: 'Product 3', price: '$30', image: '/images/product3.jpg', alt: 'Product 3' },
  { name: 'Product 4', price: '$40', image: '/images/product4.jpg', alt: 'Product 4' }
];

// Route chính cho trang index
router.get('/', (req, res) => {
   // Render template index.hbs với dữ liệu động
   res.render('index', { 
      title: "Product", 
      logoutButtonText: "Logout",
      addToCartButtonText: "Add to Cart",
      carouselImages: carouselImages,
      products: products,
      layout: 'layout'  
   });
});



// Route cho trang page để hiển thị sản phẩm từ cơ sở dữ liệu
router.get('/page', async (req, res) => {
   try {
       // Truy vấn sản phẩm từ cơ sở dữ liệu
       let products = await ProductModel.find({}).sort({ _id: -1 });
       res.render('page', { // Đảm bảo rằng `views/page.handlebars` tồn tại
           name: "Product Page",
           products: products,
           layout: 'layout_page' // Sử dụng layout `layout_page.handlebars`
       });
   } catch (error) {
       console.error('Error fetching products:', error);
       res.status(500).send('Internal Server Error');
   }
});

module.exports = router;
