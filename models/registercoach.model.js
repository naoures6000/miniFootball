const mongoose=require('mongoose')

const Joi=require('joi')

const schemavalidation=Joi.object({
    firstname:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    lastname:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')) .required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    experience:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')) .required(),
    phone:Joi.number().required(),
    password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
 
let schemacoach=mongoose.Schema({

    firstname:String,
    lastname:String,
    email:String,
    experience:String,
    phone: {
        type: String,
        required: true,
        validate: {
        validator: function(v) {
        return /^(\+\d{1,3}[- ]?)?\d{8}$/.test(v); // Regex to check if the input is a valid phone number format
        },
        message: props => `${props.value} is not a valid phone number format!`
        },
        maxlength: 8 // Limit the length of the phone number to 10 characters
        },
    password:String
})

var Coach=mongoose.model('coach',schemacoach)
module.exports=Coach


