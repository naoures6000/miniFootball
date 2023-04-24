
const mongoose=require('mongoose')

const Joi=require('joi')

const schemavalidation=Joi.object({
    team1:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    picture1:Joi.string().required(),
    team2:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    picture2:Joi.string().required(),
    time:Joi.string().required(),
    date:Joi.string(),
    
})

let schemaevents=mongoose.Schema({
    team1:String,
    picture1:String,
    team2:String,
    picture2:String,
    time:String,
    date:String
})

var Events=mongoose.model('events',schemaevents)

module.exports=Events