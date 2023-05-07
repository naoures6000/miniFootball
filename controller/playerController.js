const mongoose = require('mongoose');
const PlayerModel=require('../models/registerplayer.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
/*const multer = require("multer");
filename='';
const mystorage=multer.diskStorage({
  destination:'./uploads',
  filename:(req,file,redirect)=>{
    let date= Date.now();
    let fl= date + '.' + file.mimetype.split('/')[1];
    redirect(null,fl);
    filename=fl;
  }
})

const upload=multer({storage:mystorage});*/

const secret =process.env.secret
function generatetoken(user){
  const token = jwt.sign(user,secret)
  return token
}
 
exports.register = /*(upload.single('picture'))*/(req, res, next) => {
    const { firstname, lastname, category, phone, picture, email, password } = req.body;
  
    // check if the email already exists in the database
    PlayerModel.findOne({ email: email })
      .then((existingPlayer) => {
        if (existingPlayer) {
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
            PlayerModel.create({ firstname, lastname, category, phone, picture, email, password: hash })
              .then((player) => {
                res.status(200).send(`Player ${player.id} added!`);
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
  


  exports.login=(req, res) => {
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
  exports.getAllPlayers = (req, res, next) => {
    PlayerModel.find()
      .then((players) => {
        res.status(200).json(players);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    
  };
  exports.findoneP = (req,res,next)=>{
    PlayerModel.findById(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  }
  exports.deleteone = (req,res,next)=>{
    PlayerModel.findByIdAndDelete(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
    }
    exports.deleteall = (req,res,next)=>{
        PlayerModel.deleteMany(req.params.id)
        .then((msg)=>res.send(msg))
        .catch((err)=>res.send(err))
    }


    exports.updatePlayer = async (req, res, next) => {
      try {
        const playerId = req.params.id;
        const user = { firstname, lastname, email, category, phone, picture } = req.body;
    
        const updatedPlayer = await PlayerModel.findByIdAndUpdate(
          playerId,
        user,
          { new: true } 
        );
    
        if (!updatedPlayer) {
          return res.status(404).send(`Player with id ${playerId} not found`);
        }
    
        res.status(200).send(`Player with id ${playerId} updated!`);
      } catch (error) {
        res.status(400).send(`Error: ${error}`);
      }
    };

       