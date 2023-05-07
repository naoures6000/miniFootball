const route=require('express').Router()
const multer =require('multer')
const { register } = require('../controller/playerController.js')
const { login,updatePlayer ,getAllPlayers,verifyToken,findoneP, deleteone,deleteall} = require('../controller/playerController.js')


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

const upload=multer({storage:mystorage});
route.post('/register',(upload.any('picture')),register)
route.post('/login',login)

route.get('/getplayer',verifyToken,getAllPlayers)

route.get('/getplayer/:id',verifyToken ,findoneP)

// hi
 route.delete('/deleteplayer/:id',verifyToken ,deleteone)
 route.delete('/deleteplayers',verifyToken ,deleteall)
 route.put('/updateplayer/:id',verifyToken ,updatePlayer)
module.exports=route