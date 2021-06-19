const mongoose =require('mongoose')
const Schema = mongoose.Schema

const DatabaseShema = new Schema(
    {
        id_user:{
            type:String
        },
        nama:{
            type:String
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        image:{
            type:String
        },
        created_at:{
            type:Date,
            default:Date.now(),
        },
    })
module.exports = new mongoose.model('profile', DatabaseShema)
