const express=require('express')
const app=express()
const session=require('express-session')
const cors=require('cors')
app.use(cors())
var page=require('./routes/auth')
var page2=require('./routes/post')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:10000*60*24}
  }))

app.use(bodyParser.json())
app.use('/',page);
app.use('/',page2)

if(process.env.NODE_ENV=="production"){

  app.use(express.static('client/build'))
  const path=require('path');
  app.get('*',(req,res)=>{
  
   res.sendFile(path.resolve(__dirname,'client','build','index.html'));


  })
}

app.listen(process.env.PORT || 4000,()=>{
    console.log("SERVER IS RUNNING AT 3001")
})
