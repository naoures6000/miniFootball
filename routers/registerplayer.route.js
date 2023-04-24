const route=require('express').Router()
const { register } = require('../controller/playerController.js')
const { login,updatePlayer ,getAllPlayers,verifyToken,findoneP, deleteone,deleteall} = require('../controller/playerController.js')

route.post('/register',register)
route.post('/login',login)

route.get('/getplayer',verifyToken,getAllPlayers)

route.get('/getplayer/:id',verifyToken ,findoneP)

// hi
 route.delete('/deleteplayer/:id',verifyToken ,deleteone)
 route.delete('/deleteplayers',verifyToken ,deleteall)
 route.put('/updateplayer/:id',verifyToken ,updatePlayer)
module.exports=route