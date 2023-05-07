const route=require('express').Router()
const multer =require('multer')
const { updateEvent ,getAllEvents,verifyToken,findoneE, deleteone,deleteall,addEvent} = require('../controller/eventsController.js')
filename='';
const mystorage=multer.diskStorage({
  destination:'./uploadevents',
  filename:(req,file,redirect)=>{
    let date= Date.now();
    let fl= date + '.' + file.mimetype.split('/')[1];
    redirect(null,fl);
    filename=fl;
  }
})

const uploadevent=multer({storage:mystorage});

route.post('/addevent',(uploadevent.any('picture')),verifyToken,addEvent)
route.get('/getevents',verifyToken,getAllEvents)

route.get('/getevent/:id',verifyToken ,findoneE)


 route.delete('/deleteevent/:id',verifyToken ,deleteone)
 route.delete('/deleteevents',verifyToken ,deleteall)
 route.put('/updateevent/:id',verifyToken ,updateEvent)
module.exports=route