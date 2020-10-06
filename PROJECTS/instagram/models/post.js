const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/instagram?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })
var con =mongoose.connection;
const postSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    },
    body:{
        type:String,
        required:true
    },
    photo:{

    type:String,

    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
//ref:"model name"
    comments:[{
        text:String,
        postedBy:{
            type:mongoose.Schema.Types.ObjectId,ref:"user"
        }

    }],

   postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   } 
},{timestamps:true}
)
const postModel=mongoose.model('post',postSchema)
module.exports=postModel;