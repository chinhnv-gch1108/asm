const express = require('express');
const router = express.Router();

const ProductModel = require('../models/ProductModel');

// Get all products for admin
router.get('/admin', async (req, res) => {
    let products = await ProductModel.find({}).sort({ _id: -1 })
    res.render('product/admin', { products })
 })

// Get all products for customers
router.get('/customer', async (req, res) => {
    let products = await ProductModel.find({}).sort({ _id: -1 })
    res.render('product/customer', { products })
 })

// Get product by id
router.get('/detail/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let products = await ProductModel.findById(id);

        if (!products) {
            return res.status(404).send('Product not found');
        }

        console.log(products);
        res.render('product/detail', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete product by id
router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        console.log('Delete succeed!');
        res.redirect('/product/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Render form to add product
router.get('/add', async (req, res) => {
    let products = await ProductModel.find({})
    res.render('product/add' , { products })
 })

// Handle add product form submission
router.post('/add', async (req, res) => {
    try {
       //get input data
       let product = req.body
       //save book to DB
       await ProductModel.create(product)
       //show message to console
       console.log('Add book succeed !')
    } catch (err) {
       console.error (err)
    }
 
    //redirect to book list page
    res.redirect('/product/admin')
 })

// Render form to edit product
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id
    let products = await ProductModel.findById(id)
    res.render('product/edit', { products })
 })
 
 //process form "edit"
 router.post('/edit/:id', async (req, res) => {
    let id = req.params.id
    let products = req.body
    try {
       await ProductModel.findByIdAndUpdate(id, products)
       console.log('Edit product succeed !')
    } catch (err) {
       console.log("Edit product failed !")
       console.error(err)
    }
    res.redirect('/product/admin')
 })

// Handle search products
router.post('/search', async (req, res) => {
    try {
        let keyword = req.body.name;
        let products = await ProductModel.find({ name: new RegExp(keyword, "i") });
        res.render('product/admin', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products ascending
router.get('/sort/asc', async (req, res) => {
    try {
        let products = await ProductModel.find().sort({ bounty: 1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('product/admin', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products descending
router.get('/sort/desc', async (req, res) => {
    try {
        let products = await ProductModel.find().sort({ bounty: -1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('product/admin', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
