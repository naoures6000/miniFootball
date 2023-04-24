const mongoose = require('mongoose');
const CoachModel=require('../models/registercoach.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const multer = require("multer");

const secret =process.env.secret
function generatetoken(user){
  const token = jwt.sign(user,secret)
  return token
}
 
exports.registercoach = (req, res, next) => {
    const { firstname, lastname, experience, phone, email, password } = req.body;
  
    // check if the email already exists in the database
    CoachModel.findOne({ email: email })
      .then((existingCoach) => {
        if (existingCoach) {
          // email already exists, return an error
          return res.status(400).send('Email already exists');
        }
  
        // generate a salt for the password hash
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).send(`Error: ${err}`);
          }
  
          // hash the password with the salt
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return res.status(500).send(`Error: ${err}`);
            }
  
            // create the player with the hashed password
            CoachModel.create({ firstname, lastname, experience, phone, email, password: hash })
              .then((coach) => {
                res.status(200).send(`Coach ${coach.id} added!`);
              })
              .catch((err) => {
                res.status(400).send(`Error: ${err}`);
              });
          });
        });
      })
      .catch((err) => {
        res.status(400).send(`Error: ${err}`);
      });
  };
  


  exports.logincoach=(req, res) => {
    // check user credentials and generate a token
    const user = {email,password}=req.body
    
    const token = generatetoken(user);
  
    // return the token to the client
    res.json({ token });
  }

  exports.verifyToken = (req, res, next) => {
    // Get the token from the authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      // Set the decoded token as the user property of the request object
      req.user = decoded;
      next();
    });
  };
  
  // Define the route to get all players
  exports.getAllCoachs = (req, res, next) => {
    CoachModel.find()
      .then((coachs) => {
        res.status(200).json(coachs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    
  };
  exports.findoneC = (req,res,next)=>{
    CoachModel.findById(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  }
  exports.deleteone = (req,res,next)=>{
    CoachModel.findByIdAndDelete(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
    }
    exports.deleteall = (req,res,next)=>{
        CoachModel.deleteMany(req.params.id)
        .then((msg)=>res.send(msg))
        .catch((err)=>res.send(err))
    }


    exports.updateCoach = async (req, res, next) => {
      try {
        const coachId = req.params.id;
        const user = { firstname, lastname, email, experience, phone } = req.body;
    
        const updatedCoach = await CoachModel.findByIdAndUpdate(
          coachId,
        user,
          { new: true } 
        );
    
        if (!updatedCoach) {
          return res.status(404).send(`Coach with id ${coachId} not found`);
        }
    
        res.status(200).send(`Coach with id ${coachId} updated!`);
      } catch (error) {
        res.status(400).send(`Error: ${error}`);
      }
    };

       