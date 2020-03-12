const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart')
const User = require('../models/UserLogin');
const SaleItem = require('../models/items');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

let userData;
console.log("User Data: " + userData);

// show what is in cart
router.get('/cart/:email', (req, res, next) => {
    Cart
        .find({email: req.params.email})
        .then(data => res.json(data))
        .catch(next)
});

//login route
router.post('/login', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user._id,
                    email: user.email
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
                userData = user;
                console.log(userData);

                return res
                    .status(200)
                    .json(user)
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" })
            }
        })
    })
})

// show all the sale items from a vendor
router.get('/items/:vendor', (req, res, next) => {
    SaleItem
        .find({ vendor: req.params.vendor })
        .then(data => res.json(data))
        .catch(next)
});

//show all items on search page
router.get('/items/', (req, res, next) => {
    SaleItem
        .find()
        .then(data => res.json(data))
        .catch(next)
});

//add login info
router.post('/signup', (req, res, next) => {
    //check that all required fields are filled
    const { businessName, email, password, userType } = req.body;
    console.log(req.body);
    if (email && password && userType) {
        User
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
router.post('/cart/:id', (req, res, next) => {
    Cart
        .create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            id: req.params.id,
            email: req.body.email
        })
        .then(data => res.json(data))
        .catch(next);
})

//add to items
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
router.delete('/cart/:id', (req, res, next) => {
    Cart.findOneAndDelete({ "id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

// delete from sale items
router.delete('/items/:id', (req, res, next) => {
    SaleItem.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

//delete everything from cart
router.delete('/cart', (req, res, next) => {
    Cart.deleteMany({})
    .then(result => res.json(result))
    .catch(next)
})

module.exports = router;