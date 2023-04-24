const route=require('express').Router()

const { updateEvent ,getAllEvents,verifyToken,findoneE, deleteone,deleteall,addEvent} = require('../controller/eventsController.js')


route.post('/addevent',verifyToken,addEvent)
route.get('/getevents',verifyToken,getAllEvents)

route.get('/getevent/:id',verifyToken ,findoneE)


 route.delete('/deleteevent/:id',verifyToken ,deleteone)
 route.delete('/deleteevents',verifyToken ,deleteall)
 route.put('/updateevent/:id',verifyToken ,updateEvent)
module.exports=route