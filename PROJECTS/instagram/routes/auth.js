const express=require('express');
const app=express()
const router=express.Router();
const bodyParser=require('body-parser')
const userModel=require('../models/user')
require('dotenv').config()
const bcrypt=require('bcryptjs')
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport')
const jwt=require('jsonwebtoken')
const { getMaxListeners } = require('process')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
}})




const protection=(req,res,next)=>{

    const {authorization}=req.headers;

    if(!authorization)
    {
        res.status(401).json({error:"please login in our website "})
    }
    const token=authorization.split(" ");
    jwt.verify(token[1],'secret',(err,payload)=>{
    
        if(err)
        {
            res.status(401).json({err:'error'})
    
        }
        else
        {
           
            const {_id}=payload;
            
               userModel.findById(_id).then((data)=>{
                res.status(200).json({message:"you successfully sign in"});
                next()
            })
        }
    
    });
    }

//sign up route for user 
router.post('/signup',(req,res)=>{

      const {name,email,password,photo}=req.body;
      if(!email || !name || !password)
      {
        return   res.status(422).json({error:"please add all the feed"})
      }
      else{
      userModel.findOne({email:email}).then((savedUser)=>{
          if(savedUser)
          {
              return res.status(422).json({error:"user already exist"})
          }
          bcrypt.hash(password,10,(err,hash)=>{
          const user =new userModel({
              name:name,
              password:hash,
              email:email,
              photo:photo  
          })
          user.save().then((user)=>{

            let mailoption={
                from:process.env.EMAIL_USER,
                to:user.email,
                subject:'Welcome to our Social Media',
                html:`<h1>Hey ${user.name} 🎁</h1>
                <p>Welcome to our leechi platform</p>
              <img src=${photo} height="200px" width="200px" style="border-radius:100px;">
              `
                }
            
                
                //step3
                transporter.sendMail(mailoption,(err,data)=>{
              
                })
                              res.status(200).json({user:"saved successfuly"})
          })
        
        })
      })
    }
})
//sign in router for user

router.post('/signin',(req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password)
    {
      return   res.status(422).json({error:"please add all the feed"})
    }
    else
    {
        userModel.findOne({email:email}).then((saveUser)=>{
                
            if(!saveUser){
                return   res.status(422).json({error:"user does not exist"})
             
}
            else
            {
                bcrypt.compare(password,saveUser.password,(err,result)=>{
                    if(result)
                    {
                        const token=jwt.sign({_id:saveUser._id},"secret")

                           
                         const {_id,name,email}=saveUser;

                         req.session.userid=_id;
                         req.session.token=token;
                       
                         const followers=saveUser.followers
                         const following=saveUser.following
                         const photo=saveUser.photo;                
                        
                    res.status(200).json({message:"message confirm",token:token,user:{_id,name,email,followers,following,photo}})
                    }
                    else
                    {
                    
                        res.send('not valid')
                    }
                })
              
            }
        })
    }
})
module.exports=router


