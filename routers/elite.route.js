const route=require('express').Router()
const eliteModel=require('../models/elite.model')
const jwt=require('jsonwebtoken')


route.get('/',(req,res,next)=>{
    res.send('hello')
})


var privatekey="clousha"


verifyToken=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
      res.status(400).json({msg:'access rejected...!!!'})
    }
  
    try{
      jwt.verify(token,privatekey)
      next()
    }catch(err){
      res.status(400).json({msg:err})
  
    }
  }


  route.post('/addelite',(req,res,next)=>{
    eliteModel.postelite(req.body.playername,req.body.region,req.body.equipe)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  })

  route.get('/getelite',verifyToken ,(req,res,next)=>{
    let token=req.headers.authorization
    let elite=jwt.decode(token,{complete:true})
    eliteModel.getAllelite()
    .then((doc)=>res.status(200).json({getelite:doc,elite:elite}))
    .catch((err)=>res.status(400).json(err))
  })

  route.get('/getelite/:id',verifyToken ,(req,res,next)=>{
    eliteModel.getOneelite(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  })

  route.delete('/deletelite/:id',verifyToken ,(req,res,next)=>{
    eliteModel.deleteOneelite(req.params.id)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  })

  route.patch('/updateelite/:id',verifyToken ,(req,res,next)=>{
    eliteModel.updateOneelite(req.params.id,req.body.playername,req.body.region,req.body.equipe)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
  })
  
  
  module.exports=route
   