// INITIALIZING AND IMPORTING MODULES //
const express = require('express');
const controller = require("../controllers/user");
// const validateMiddleWare = require('../middleware/validate0');
const auth = require('../middleware/validate')
const Joi = require('joi');

// const authoriser = function(req, res, next){
//     const isValid = false;
//     /**
//      * Logic
//      */
//     if(isValid) {
//         next();
//     } else {
//         res.statusCode = 401;
//         res.end();
//     }
// }




// USER LOGIN JOI-VALIDATION LOGIC //

const loginJoiValidation = function(req, res, next) {
    // joi validation schema
    // compare with requet body
    // response accodingl;y

    const schema = Joi.object({
        
        username:Joi.string().required(),
        email: Joi.string().email().min(5).max(500).required(),
        password: Joi.string().min(8).max(1024).required(),
        
    })   
    const validUser = ((schema.email = req.body.email) && (schema.password = req.body.password))
    if(validUser) {
        console.log('valid address data is enter...')
        req.user = validUser;
        next();
    } else {
        res.statusCode = 401;
        res.end();
    }
}


// CREATING ROUTES //
const router = express.Router();
router.get("/getall",controller.getData);
router.get("/me",auth,controller.getUserData);
router.post("/signup", controller.signupPost);
router.post("/login", loginJoiValidation,controller.loginData);
//router.patch("/update/me",auth,controller.updateData)


module.exports= router;


