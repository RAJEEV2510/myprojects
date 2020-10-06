const express=require('express');
const app=express()
const mongoose=require('mongoose')
var postModel=require('../models/post')
const router=express.Router();
const bcrypt=require('bcryptjs')
const userModel=require('../models/user')
const jwt=require('jsonwebtoken')
const protection=require('../middleware/requireLogin');
const { Mongoose } = require('mongoose');
const { populate } = require('../models/user');
router.post('/createpost',protection,(req,res,next)=>{

    const {title,body,photo}=req.body;
 
     if(!title || !body || !photo)
     {
        return res.status(422).json({error:"please add all things",title,body,photo})
     }
        const post= new postModel({
        title:title,
         body:body,
         photo:photo,
         likes:[],
         postedBy:req.user
     })
     post.save((err,data)=>{
         if(err) throw err
        res.status(200).json({
            message:data,
           
        })
     })
    })
router.put("/like",protection,(req,res,next)=>{

 postModel.findByIdAndUpdate(req.body.postId, 
        {$push:{likes:req.user.id}},
            {
                new:true
            }
        ).populate('postedBy',"name email").then((data)=>{
            res.json(data)
        })
})

router.put("/unlike",protection,(req,res,next)=>{

 
    postModel.findByIdAndUpdate(req.body.postId, 
        {$pull:{likes:req.user.id}},
            {
                new:true
            }
        ).populate('postedBy',"name email").then((data)=>{
            res.json(data)
        })
})

//comment
 router.put("/comment",protection,(req,res)=>{

    const comments={
        text:req.body.text,
        postedBy:req.user._id
    }
    postModel.findByIdAndUpdate(req.body.postId,   
        {$push:{comments:comments}},
            {//new use so that comment section push in everuy section
                new:true
            }
        ).populate("comments.postedBy"," _id name").populate('postedBy',"name email").
        then((data)=>{
            res.json(data)
        })
    
})
//all post present at home page
router.get('/allpost',(req,res,next)=>{
    postModel.find().populate('postedBy',"name email")
    .populate("comments.postedBy"," _id name").
    sort('-createdAt').
    then((data)=>{
        res.send(data)
    })

})
//get subscribed Post
router.get('/getsubpost',protection,(req,res,next)=>{
  
    postModel.find({postedBy:{$in:req.user.following}}).populate('postedBy',"name email")
    .populate("comments.postedBy"," _id name").
    then((data)=>{
        res.send(data)
    })

})

//my post 
router.get('/mypost',protection,(req,res,next)=>{
    postModel.find({postedBy:req.user.id}).populate("postedBy","name email").then((data)=>{
        res.send(data)
    })
})

router.delete('/delete/:postId',protection,(req,res,next)=>{

    const id=req.params.postId;
   
    postModel.findOne({_id:id}).populate("postedBy","_id").then((data)=>{

        if(!data)
        {
            return res.status(422).json({err:"error"})
        }
        
            if(data.postedBy._id.toString()==req.user.id.toString())
            {
                data.remove().then((result)=>{

                    res.json(result)

                })

            }
    })

})
//for profile navigating to others
router.get('/user:id',protection,(req,res)=>{

    userModel.findOne({_id:req.params.id})
    .select("-password").then((user)=>{
        postModel.find({postedBy:req.params.id}).populate("postedBy","_id name").exec((err,posts)=>{

            if(err){
                return res.status(422).json({err:err})
            }
            res.json({user,posts})
        })

    }).catch(err=>{
        return res.status(404).json({err:"user not found"})
    })
})
//for follow the user unfollow the user
router.put('/follow',protection,(req,res)=>{

        userModel.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}}
            , {new:true}
            ,(err,result)=>{

                if(err)
                {
                    return res.status(422).json({err:err})
                }
            userModel.findByIdAndUpdate(req.user._id,{
                    $push:{following:req.body.followId}
                },{new:true}).select("-password").then((result)=>{

                    res.json(result)
                })

            })


})

router.put('/unfollow',protection,(req,res)=>{

    userModel.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}}
        , {new:true}
        ,(err,result)=>{

        userModel.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.followId}
            },{new:true}).select("-password").then((data)=>{
           
                res.json(data)
            })
        })
    })

router.put('/message/:id',protection,(req,res)=>{

        const messages={
            text:req.body.text,
            messageBy:req.user._id
            }
        userModel.findByIdAndUpdate(req.params.id,   
            {$push:{messages:messages}},
                {
                    new:true
                }
            ).populate("messages.messageBy"," _id name").populate('messageBy',"name email").
            then((data)=>{
                res.json(data)
            })
    })
    router.get('/message/:id',protection,(req,res)=>{
      
                userModel.findByIdAndUpdate(req.params.id,   
                    ).populate("messages.messageBy"," _id name").populate('messageBy',"name email").
                    then((data)=>{
                        res.json(data)
                    })
            })
 router.get('/viewmsg',protection,(req,res)=>{
 userModel.findById(req.user._id).populate("messages.messageBy"," _id name").populate('messageBy',"name email").then((data)=>{

    res.json(data);

        })
 })      
 router.put('/updatepic',protection,(req,res)=>{
    userModel.findByIdAndUpdate(req.user._id,{$set:{photo:req.body.photo}}).then((result)=>{
        res.json(result);
 })

 })
 router.post('/search',(req,res,next)=>{
    
   
    let userPattern=new RegExp("^"+req.body.query)
    userModel.find({email:{$regex:userPattern}}).
    select("_id email").then((data)=>{
        res.json({data});
    }).catch((err)=>{
    
    })
 })
 module.exports=router