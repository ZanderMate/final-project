import ClientLogin from '../models/clientlogin';
import VendorLogin from '../models/vendorlogin';

module.exports = (app) => {

    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            password,
            businessName
        } = body;
        let {
            email
        } = body;
        if (!(email || password)) {
            return res.end({
                success: false,
                message: "Error: Missing required field(s)"
            })
        }
        email = email.toLowerCase();
        if (userType === 'customer') {
            ClientLogin.find({
                email: email
            }, (err, previousUsers) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server Error'
                    });
                } else if (previousUsers.length > 0) {
                    res.end({
                        success: false,
                        message: 'Error: Account already exists.'
                    })
                } else {
                    const newUser = new ClientLogin();
                    newUser.email = email;
                    newUser.password = password;
                    newUser.save((err, vendor) => {
                        if (err) {
                            res.end({
                                success: false,
                                message: 'Error, Server Error'
                            });
                        }
                        res.end({
                            success: true,
                            message: 'Signed up!'
                        })
                    })
                }
            })
                .then(data => res.json(data))
                .catch(next)
        } else if (userType === 'vendor') {
            VendorLogin.find({
                email: email
            }, (err, previousUsers) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server Error'
                    });
                } else if (previousUsers.length > 0) {
                    res.end({
                        success: false,
                        message: 'Error: Account already exists.'
                    })
                } else {
                    const newUser = new VendorLogin();
                    newUser.email = email;
                    newUser.password = newUser.generatedHash(password);
                    newUser.businessName = businessName;
                    newUser.save((err, vendor) => {
                        if (err) {
                            res.end({
                                success: false,
                                message: 'Error, Server Error'
                            });
                        }
                        res.end({
                            success: true,
                            message: 'Signed up!'
                        })
                    })
                }
            })
                .then(data => res.json(data))
                .catch(next)
        }
    })
}
