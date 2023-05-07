const mongoose=require('mongoose')

const Joi=require('joi')

const schemavalidation=Joi.object({
    firstname:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    lastname:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    category:Joi.string(),
    phone:Joi.number().required(),
    password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    picture:Joi.string(),
})
 
let schemaplayer=mongoose.Schema({
    
    firstname:String,
    lastname:String,
    email:String,
    category:String,
    phone: {
        type: String,
        maxlength: 8 // Limit the length of the phone number to 10 characters
        },
    password:String,
    picture: String,
})


    var Player=mongoose.model('player',schemaplayer)
    module.exports=Player
    
