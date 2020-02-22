const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const VendorLogin = require('../models/vendorlogin');
const ClientLogin = require('../models/clientlogin');
const SaleItem = require('../models/items');
const passport = require('passport');

//show what is in cart
// router.get('/cart', (req, res, next) => {
//     Cart
//         .find({})
//         .then(data => res.json(data))
//         .catch(next)
// });

// router.get('/vendorlogin', (req, res, next) => {
//         VendorLogin
//             .find({})
//             .then(data => res.json(data))
//             .catch(next)
//     });

//show all the sale items
router.get('/sale-items', (req, res, next) => {
    SaleItem
        .find()
        .then(data => res.json(data))
        .catch(next)
});

//add client info
router.post('/clientlogin', async (req, res, next) => {
    const hashedPasswordClient = await bcrypt.hash(req.body.password, 10)
    if (req.body.email && hashedPasswordClient) {
        ClientLogin
            .create(req.body)
            .then(result => res.json(result))
            .catch(next);
    }
});

//add vendor login info
router.post('/vendorlogin', async (req, res, next) => {
    const hashedPasswordVendor = await bcrypt.hash(req.body.password, 10)
    if (req.body.businessName && req.body.email && hashedPasswordVendor) {
        VendorLogin
            .create(req.body)
            .then(result => res.json(result))
            .catch(next);
    }
});

//add to cart
// router.post('/cart', (req, res, next) => {
//     if (req.body.item) {
//         Cart
//             .create(req.body)
//             .then(data => res.json(data))
//             .catch(next);
//     }
//     else {
//         res.json({ error: "The item field is empty" })
//     }
// });

//add to sale items
router.post('/sale-items', (req, res, next) => {
    if (req.body.name && req.body.price && req.body.imgsource) {
        SaleItem
            .create(req.body)
            .then(data => res.json(data))
            .catch(next);
    }
    else {
        res.json({ error: "The item field is empty" })
    }
});

//delete from cart
// router.delete('/cart/:id', (req, res, next) => {
//     Cart.findOneAndDelete({ "_id": req.params.id })
//         .then(data => res.json(data))
//         .catch(next)
// });

//delete from sale items
// router.delete('/sale-items/:id', (req, res, next) => {
//     SaleItem.findOneAndDelete({ "_id": req.params.id })
//         .then(data => res.json(data))
//         .catch(next)
// });

module.exports = router;