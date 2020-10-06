const express=require('express');
const app=express()
var postModel=require('../models/post')
const router=express.Router();
const bcrypt=require('bcryptjs')
const userModel=require('../models/user')
const jwt=require('jsonwebtoken')
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
            res.status(401).json({payload:payload})
    
        }
        else
        {
           
            const {_id}=payload;
            
               userModel.findById(_id).then((data)=>{
                req.user=data                    
                next()
            })
        }
    
    });
    }
module.exports=protection
