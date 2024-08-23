const express = require('express');
const router = express.Router();

const SportsModel = require('../models/SportsModel');

// Get all products for admin
router.get('/admin', async (req, res) => {
    let sports = await SportsModel.find({}).sort({ _id: -1 })
    res.render('sport/admin', { sports })
 })

// Get all products for customers
router.get('/customer', async (req, res) => {
    let sports = await SportsModel.find({}).sort({ _id: -1 })
    res.render('sport/customer', { sports })
 })

// Get product by id
router.get('/detail/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let sports = await SportsModel.findById(id);

        if (!sports) {
            return res.status(404).send('sport not found');
        }

        console.log(sports);
        res.render('sport/detail', { sports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete product by id
router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await SportsModel.findByIdAndDelete(id);
        console.log('Delete succeed!');
        res.redirect('/sport/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Render form to add product
router.get('/add', async (req, res) => {
    let sports = await SportsModel.find({})
    res.render('sport/add' , { sports })
 })

// Handle add product form submission
router.post('/add', async (req, res) => {
    try {
       //get input data
       let sport = req.body
       //save book to DB
       await SportsModel.create(sport)
       //show message to console
       console.log('Add sport succeed !')
    } catch (err) {
       console.error (err)
    }
 
    //redirect to book list page
    res.redirect('/sport/admin')
 })

// Render form to edit product
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id
    let sports = await SportsModel.findById(id)
    res.render('sport/edit', { sports })
 })
 
 //process form "edit"
 router.post('/edit/:id', async (req, res) => {
    let id = req.params.id
    let sports = req.body
    try {
       await SportsModel.findByIdAndUpdate(id, sports)
       console.log('Edit product succeed !')
    } catch (err) {
       console.log("Edit product failed !")
       console.error(err)
    }
    res.redirect('/sport/admin')
 })

// Handle search products
router.post('/search', async (req, res) => {
    try {
        let keyword = req.body.name;
        let sports = await SportsModel.find({ name: new RegExp(keyword, "i") });
        res.render('sport/admin', { sports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products ascending
router.get('/sort/asc', async (req, res) => {
    try {
        let sports = await SportsModel.find().sort({ bounty: 1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('sport/admin', { sports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products descending
router.get('/sort/desc', async (req, res) => {
    try {
        let sports = await SportsModel.find().sort({ bounty: -1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('sport/admin', { sports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
