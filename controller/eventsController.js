const mongoose = require('mongoose');
const EventModel=require('../models/events.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const multer = require("multer");

const secret =process.env.secret
function generatetoken(user){
  const token = jwt.sign(user,secret)
  return token
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

  exports.addEvent=async(req,res)=>{
    const addevent= EventModel.create(req.body)
    res.status(200).json({data:addevent})
  }
  
  // Define the route to get all players
  exports.getAllEvents = (req, res, next) => {
    EventModel.find()
      .then((events) => {
        res.status(200).json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    
  };
  exports.findoneE = (req,res,next)=>{
    EventModel.findById(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  }
  exports.deleteone = (req,res,next)=>{
    EventModel.findByIdAndDelete(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
    }
    exports.deleteall = (req,res,next)=>{
        EventModel.deleteMany(req.params.id)
        .then((msg)=>res.send(msg))
        .catch((err)=>res.send(err))
    }


    exports.updateEvent = async (req, res, next) => {
      try {
        const eventId = req.params.id;
        const user = { team1,team2,time,date,picture1,picture2 } = req.body;
    
        const updatedEvent = await EventModel.findByIdAndUpdate(
          eventId,
        user,
          { new: true } 
        );
    
        if (!updatedEvent) {
          return res.status(404).send(`event with id ${eventId} not found`);
        }
    
        res.status(200).send(`event with id ${eventId} updated!`);
      } catch (error) {
        res.status(400).send(`Error: ${error}`);
      }
    };

       