const route=require('express').Router()
const { registercoach } = require('../controller/coachController.js')
const { logincoach,updateCoach ,getAllCoachs,verifyToken,findoneC, deleteone,deleteall} = require('../controller/coachController.js')

route.post('/registercoach',registercoach)
route.post('/logincoach',logincoach)

route.get('/getcoach',verifyToken,getAllCoachs)

route.get('/getcoach/:id',verifyToken ,findoneC)


 route.delete('/deletecoach/:id',verifyToken ,deleteone)
 route.delete('/deletecoachs',verifyToken ,deleteall)
 route.put('/updatecoach/:id',verifyToken ,updateCoach)
module.exports=route