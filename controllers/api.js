const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const VendorLogin = require('../models/vendorlogin');
const ClientLogin = require('../models/clientlogin');
const SaleItem = require('../models/items');
const passport = require('passport');

const intializePassPort = require('../config/passport-config');
intializePassPort(
    passport,
    email => {
        if (userType === 'vendor') {
            VendorLogin.find(vendor => vendor.email === email)
        } else if (userType === 'customer') {
            ClientLogin.find(client => client.email === email)
        }
    },
    _id => {
        if (userType === 'vendor') {
            VendorLogin.find(vendor => vendor._id === _id)
        } else if (userType === 'customer') {
            ClientLogin.find(client => client._id === _id)
        }
    }
)

//show what is in cart
// router.get('/cart', (req, res, next) => {
//     Cart
//         .find({})
//         .then(data => res.json(data))
//         .catch(next)
// });

router.post('/vendorlogin', passport.authenticate('local', {
    successRedirect: '/storefront',
    failureRedirect: '/login',
    failureFlash: true
}))

//show all the sale items
router.get('/sale-items', (req, res, next) => {
    SaleItem
        .find()
        .then(data => res.json(data))
        .catch(next)
});

//add client info
router.post('/clientsignup', async (req, res, next) => {
    const { email, password, userType } = req.body;
    if (email && password && userType) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            ClientLogin
                .create({
                    email: email,
                    password: hashedPassword,
                    userType: userType
                })
            res.redirect('/login');
        } catch {
            res.redirect('/signup')
        }
    }
    console.log("Signed up successfully!")
})

//add vendor login info
router.post('/vendorsignup', async (req, res, next) => {
    //check that all required fields are filled
    const { businessName, email, password, userType } = req.body;
    if (businessName && email && password && userType) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            VendorLogin
                .create({
                    businessName: businessName,
                    email: email,
                    password: hashedPassword,
                    userType: userType
                })
            res.redirect('/login');
        } catch {
            res.redirect('/signup')
        }
    }
    console.log("Signed up successfully!")
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