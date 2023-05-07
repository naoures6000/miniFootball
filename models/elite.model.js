const { rejects } = require('assert')
const mongoose=require('mongoose')
const { resolve } = require('path')
const Joi=require('joi')


const schemavalidation=Joi.object({
    playername:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    region:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$')) .required(),
    equipe:Joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
 .required(),
})

let schemaelite=mongoose.Schema({
    playername:String,
    region:String,
    equipe:String
})

const Elite=mongoose.model('Elite',schemaelite)

let url='mongodb://127.0.0.1:27017/Minifoot'

exports.postelite=async(playername,region,equipe)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(async ()=>{
            let validation= await schemavalidation.validateAsync({
                playername:playername,
                region:region,
                equipe:equipe
            
            })
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            let elite = new Elite({
                playername:playername,
                region:region,
                equipe:equipe
            })

            elite.save().then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}


exports.getAllelite=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Elite.find()

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOneelite=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Elite.findById(id)

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteOneelite=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Elite.deleteOne({_id:id})

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.updateOneelite=async(playername,region,equipe)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(async ()=>{
            let validation= await schemavalidation.validateAsync({
                playername:playername,
                region:region,
                equipe:equipe
            
            })
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            return Elite.updateOne({_id:id},{playername:playername,region:region,equipe:equipe})

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

module.exports = Elite;


