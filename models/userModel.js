// INITIALIZING AND IMPORTING MODULE //
const mongoose = require('mongoose');
const Joi = require('joi');
// const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken')
var CryptoJS = require('crypto-js');
const validate = require('../middleware/validate')



//---MONGOOSE SCHEMA MODEL---//
const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: ['Please enter a username']
  },
  email: {
    type: String,
    required: ['Please enter a email'],
    unique: true,
    lowercase: true,
  },
  password: {

    type: String,
    required: ['Please enter a password'],
    minlength: 6,
  }
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }],
 
},
{ timestamps: true })



//Methods//

//---GENERATING TOKEN FOR AUTHENTICATION---// 
userSchema.methods.generateAuthToken = async function () {
  const user = this   

  const token = jwt.sign({data: user}, process.env.SECRET_KEY,{expiresIn:'2h'})
  //user.tokens = user.tokens.concat({ token })
const genToken = {token : token}
  await user.save();
  return genToken;
}



const bcrypt = require('bcrypt');


userSchema.pre('save', function(next) {
  var person = this;
  if (!person.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(person.password, salt, function(err, hash) {
      person.password = hash;
      next();
    });
  });
});

// userSchema.methods.comparePassword = function(password,next) {
//   bcrypt.compare(password, this.password, function(err, isMatch) {
//     if(isMatch) {return next()}
//     else {console.log(err)}
//   });
// };

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    return done(err, isMatch);
  });
};


module.exports = mongoose.model('authmodel', userSchema);