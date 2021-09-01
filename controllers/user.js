// INITIALIZING AND IMPORTING MODULES
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/userModel');


//---GET-ALL DATA---//
exports.getData = (async (req, res) => {
    try {
        const user = await User.find(); //finding data from database
        
        res.send(user);                //findind data is respond here
        console.log('----------GETTING ALL DATA SUCCESSFULL----------');
    } catch (error) {
        console.log('----------DATA GETTING ERROR OCCUR----------');
        res.status(400).send(err);
    }

})


//--- SIGNUP DATA---//
exports.signupPost = (async (req, res) => {
    //request to body for data 
    try {
        // 
        const { email} = req.body;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);           // if data is generated perfectly
        console.log('----------SIGNUP SUCCESSFULL----------');
    } catch (err) {
        console.log('----------SIGNUP ERROR OCCUR----------');
        res.status(400).send(err);
        console.log(err)
    }
});


//---LOGIN DATA---//\
/**
 * - Get login reqeust data
 * - Validation user request parameters
 * - Check user is exist oin database or niot
 * - If user exist then check apssword
 *      - get passwod from database and compare with request password
 * - If everything oka then generate access token
 * - send response with access token and user details(exlude password)
 */
exports.loginData = (async (req, res) => {
    const valid = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await User.findOne({
        "email": req.body.email
    });
    if(!user){
        return res.status(404).send({ message: "User Not found. Please signup..." });
    }
    console.log(user);
    var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password. Please try again."
        });
      }
    const userToken = await user.generateAuthToken();
    //return res.status(201).send({user,userToken});

//     var token = jwt.sign({ id: user.id.toString() }, process.env.SECRET_KEY, {
//         expiresIn: 86400 // 24 hours
//       });
    var userObj = user.toObject();
delete userObj.password;
res.json({ user : userObj,userToken});
});


//---GET USER DATA---//
exports.getUserData = (async(req,res)=>{
    try {
        // const user = await User.findOne(); //finding data from database
        // res.send(user);                //findind data is respond here
        // const userObj = user.toObject();
        // const data = delete userObj.password;
        //res.json({ user : userObj,userToken, status: "SUCCESS" });
        res.status(200).json(req.user)
        console.log('----------GETTING USER DATA SUCCESSFULL----------');
    } catch (err) {
        console.log('----------DATA GETTING ERROR OCCUR----------');
        res.status(400).send(err);
    }
});


//---UPDATE USER DATA---//
// exports.updateData = (req,res)=>{
//     const user = new User(_id)
//     const user = User.findByIdAndUpdate
// }