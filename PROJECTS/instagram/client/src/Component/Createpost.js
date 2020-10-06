import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css'
function Createpost() {

    const history=useHistory();
    const [title,setTitle]=useState();
    const [body,setBody]=useState();
    const [image,setImage]=useState();
    const [url,setUrl]=useState();
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
     
                method:"post",
                headers:{
                   "Content-Type":"application/json",
                   "authorization":"bearer "+localStorage.getItem('jwt')
               },
               body:JSON.stringify({
                   title:title,
                   body:body,
                   photo:url,
                   
           
               })
           
           }).then((res)=>{
                
               return res.json()
           }).then(data=>{

               if(data.error)
               {
                   M.toast({html:data.error,classes:"#b71c1c red darken-4"})
               }
               
               else{
                 
                   M.toast({html:"uploaded  success fully",classes:"#b71c1c green darken-4"})
                   history.push('/')
               }
               }).catch((err)=>{console.log(err)})
              
           }
         
           
    })
    const postDetails=()=>{
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

        

 return (
        <>

            <div style={{ margin: "100px auto", maxWidth: '500px', padding: '20px' }}>
                <h3>
                    Create POST</h3>
                <div className="card input-field"  style={{padding:"20px"}}>
                    <input text="text" placeholder="Caption" value={title}
                    onChange={e=>setTitle(e.target.value)}
                    
                    ></input>
                    <input text="text" placeholder="Written About post" value={body} onChange={e=>setBody(e.target.value)}></input>
                </div>
                <div className="file-field input-field" style={{padding:"20px"}}>
                    <div className="btn">
                        <span>Upload Post</span>
                        
                        <input type="file" placeholder="upload image" onChange={e=>setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper" style={{padding:"10px"}}>
                        <input className="file-path validate" type="text" />
                    </div>
                    <br></br>
                    <button className="btn waves-effect waves-light #004d40 blue darken-4" onClick={postDetails}>
                        Submit Post
                     </button>

                </div>
            </div>
        </>
    )
}

export default Createpost