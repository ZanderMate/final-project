const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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

router.post('/vendorlogin', passport.authenticate('local', function (req, res) {
    res.json(req.user);
    window.location.href("/storefront/:businessName")
}))

router.post('/clientlogin', passport.authenticate('local', function (req, res) {
    res.json(req.user);
    window.location.href("/search")
}))

//show all the sale items
router.get('/items/:businessName', (req, res, next) => {
    console.log('Params: ' + req.params)
    SaleItem
        .find({ vendor: req.params })
        .then(data => res.json(data))
        .catch(next)
});

router.get('/items', (req, res, next) => {
    SaleItem
        .find()
        .then(data => res.json(data))
        .catch(next)
});

//add client info
router.post('/clientsignup', async (req, res, next) => {
    console.log(req.body);
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
            res.send("login")
            // res.redirect('/login');
        } catch (err) {
            console.log(err);
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
            res.status(400)
        } catch {
            res.redirect('/signup')
        }
    }
    console.log("Signed up successfully!")
});

//add to cart
// router.post('/cart/:email', (req, res, next) => {
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
router.post('/items', (req, res, next) => {
    const { cardName, price, imgsource, type_line, vendor } = req.body;
    if (cardName && price && imgsource && type_line) {
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