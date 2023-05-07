const route=require('express').Router()
const { string } = require('joi');
const Elite = require('../models/elite.model');
const Player = require('../models/registerplayer.model');


// Define the API endpoint for adding a player to an elite group
route.post('/elites/:eliteId/players', async (req, res) => {
  const eliteId = req.params.eliteId;
  const playerId = req.body.playerId;
  const firstname=req.body.firstname;
  const lastname=req.body.lastname;
  const email=req.body.email;
  const category=req.body.category;
  const phone=req.body.phone;

  try {
    // Find the Elite document by ID
    const elite = await Elite.findById(eliteId);
    if (!elite) {
      return res.status(404).send({ message: 'Elite group not found' });
    }

    // Create a new Player document
    const player = new Player({ _id: playerId,_id:eliteId ,firstname,lastname,email,category,phone});
    await player.save();

    // Add the new Player to the Elite's "players" array
    elite.players?.push(player);
    await elite.save();

    return res.status(201).send({ message: 'Player added to Elite group' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});
module.exports=route
