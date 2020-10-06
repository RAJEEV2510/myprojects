const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/instagram?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })
var con =mongoose.connection;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{

        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        default:"https://legacymesa.com/wp-content/uploads/2015/07/No-Image-Available1.png"
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    
    messages:[{
        text:String,
        messageBy:{
            type:mongoose.Schema.Types.ObjectId,ref:"user"
        }

    }],

})
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;