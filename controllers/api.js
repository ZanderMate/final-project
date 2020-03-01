const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart')
const VendorLogin = require('../models/vendorlogin');
const ClientLogin = require('../models/clientlogin');
const SaleItem = require('../models/items');
const passport = require('passport');


//show what is in cart
// router.get('/cart/:email', (req, res, next) => {
//     Cart
//         .find({})
//         .then(data => res.json(data))
//         .catch(next)
// });

router.post('/login', function (req, res, next) {

    console.log("Body: " + req.body);


    console.log('routes/vendorlogin.js, login, req.body: ');
    console.log(req.body)
    res.send("hi");
}   
)

// router.post('/clientlogin', passport.authenticate('local', function (req, res) {
//     res.json(req.user);
//     window.location.href("/search")
// }))

//show all the sale items from a vendor
router.get('/items/:vendor', (req, res, next) => {
    console.log(req.params.vendor) //this isn't firing?
    SaleItem
        .find({ vendor: req.params.vendor })
        .then(data => res.json(data))
        .catch(next)
});

router.get('/items', (req, res, next) => {
    SaleItem
        .find()
        .then(data => res.json(data))
        .catch(next)
});

//add vendor login info
router.post('/signup', (req, res, next) => {
    //check that all required fields are filled
    const { businessName, email, password, userType, urlName } = req.body;
    console.log(req.body);
    if (businessName && email && password && userType && urlName) {
        VendorLogin
            .create({
                businessName: businessName,
                email: email,
                password: password,
                userType: userType,
                urlName: encodeURI(businessName)
            })
        res.status(400)
        console.log("Signed up successfully!")
    }
})

// add to cart
router.post('/cart/:email', (req, res, next) => {
    Cart
        .create({
            name: req.body.name,
            price: req.body.price,
            email: req.params.email
        })
        .then(data => res.json(data))
        .catch(next);
})

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