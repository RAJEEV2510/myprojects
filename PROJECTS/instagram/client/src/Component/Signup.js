import React,{useState,useEffect} from 'react';
import './login.css'
import M from 'materialize-css'

import {Link,useHistory} from 'react-router-dom'
function Signup() {
    const history=useHistory();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)    
    
    useEffect(()=>{
        if(url)
        {
            uploadFields()
        }


    },[url])
    const uploadPic=()=>{
        const data = new FormData();
        data.append("file",image)


        data.append('upload_preset',"Leechi")
        data.append('cloud_name',"rajeev")
        fetch('	https://api.cloudinary.com/v1_1/rajeev/image/upload/',{
        method:"post",
        mode:"cors",
        body:data

        }).then(res=> {return res.json()} ).then(data=>setUrl(data.url)).catch((err)=>console.log(err))

    }

    const uploadFields=()=>{


        
        if(!name || !email || !password)
        {
            M.toast({html:"fill the details",classes:"#b71c1c red darken-4"})                
            return 
        }

    else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {


    
    fetch("/signup",{
        Accept: 'application/json',
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name:name,
        password:password,
        email:email,
        photo:url

    })

}).then((res)=>{
    return res.json()
}).then(data=>{
    if(data.error)
    {
        M.toast({html:data.error,classes:"#b71c1c red darken-4"})
    }
    
    else{
        M.toast({html:data.user,classes:"#b71c1c green darken-4"})
        history.push('/login')
    }
    }).catch((err)=>{console.log(err)})
   
}
else
{   
    M.toast({html:"email is invalid",classes:"#b71c1c red darken-4"})
   

}
}
    const PostData=()=>{
        if(image){
            uploadPic()

        }
        else
        {
            uploadFields();
        }
        
    }

    return (
        <div className="Mycard">
        <div className="card auth-card">
            <h2 className="leechi">Leechi</h2>
            <input type="text" className="field" placeholder="name" value={name} onChange={e=>setName(e.target.value)} required></input>
            <input type="text" className="field" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required></input>
            
            <input type="password" className="field" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required></input>


            <div className="file-field input-field" style={{padding:"20px"}}>
            <div className="btn">
                <span>Upload Profile Pic</span>
                
                <input type="file" placeholder="upload image" onChange={e=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper" style={{padding:"10px"}}>
                <input className="file-path validate" type="text" />
            </div>
              </div>   
               <button className="btn waves-effect waves-light  #004d40 teal darken-4" onClick={PostData}>
                Sign Up
             </button>

             <h6>
             <Link to="/login">Already Have an account ? </Link>
             </h6> 
        </div>
        </div>
    )
}

export default Signup;
