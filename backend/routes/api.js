const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/products', (req, res, next) => {
    Product.find({})
        .then((data) => res.json(data))
        .catch(next);
});

// Add new product
router.post('/products', (req, res, next) => {
    if (req.body.name && req.body.price && req.body.category) {
        Product.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.status(400).json({ error: 'Please provide all fields (name, price, category)' });
    }
});

// Update product by ID
router.put('/products/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.json(data))
        .catch(next);
});

// Delete product by ID
router.delete('/products/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;
