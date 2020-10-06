import React,{useEffect,useState,useContext} from 'react';
import './login.css'
import M from 'materialize-css'
import {useParams,Link}  from 'react-router-dom'
import { usercontext } from '../App'
const Messege=()=>{
    const {state,dispatch}=useContext(usercontext)
    const {Id}=useParams();
    const [chat,setChat]=useState("");
    const [data,setData]=useState([])

const msg=()=>{
    if(chat==""){
        M.toast({html:"sending message is empty",classes:"#b71c1c red darken-4"})
    }
    else{
    fetch(`/message/${Id}`,{

        method:'put',
        headers:{
            "Content-Type":"application/json",
            authorization:"bearer "+localStorage.getItem("jwt")
        },
     body:JSON.stringify({text:chat})
    }).then(res=>{return res.json()}).then((result)=>{
    
    })
   
    M.toast({html:"message sending succesfully to other user wait for reply",classes:"#b71c1c red darken-4"})
    }

}



const show=()=>{fetch(`/message/${Id}`,{

    method:'get',
    headers:{
        "Content-Type":"application/json",
        authorization:"bearer "+localStorage.getItem("jwt")
    },
}).then(res=>{return res.json()}).then((result)=>{
    //user object override the prevstate
    setData(result.messages)
       
})

}
 return (<>



        <br></br>
       <br></br>
       <br></br>
       {/**HIDE THE SHOWING MESSAGE OPTION TO OTHERS USERS */}
       {state?state._id==Id?
        <>
        <button  className="btn waves-effect  #004d40 blue darken-4"
         onClick={()=>{

            show();
        }}>
                Show Messages
         </button>
         <h3>Your Messages</h3>
         </>
         : 

         <>
         <h5 style={{width:"80%",padding:"20px",marginBottom:"100px",boxShadow:"1px 1px 10px grey"}}>Send Messages Privately </h5>
        <input placeholder= "send the message to the user" value={chat} onChange={(e)=>{
            setChat(e.target.value)
            
        }}></input>
                   
      
         <button  className="btn waves-effect  #004d40 blue darken-4" 
         style={{width:"200px"}}
         onClick={()=>{

            msg();
            setChat("")
        }}>
                 Submit
         </button></>
                 :""
        }
        {data?     
        data.map((item)=>{
             return(
                    <>
                    <div class="row">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">  {item.messageBy.name}</span>
                    
                          <p style={{height:"auto",
                          padding:"10px",
                          boxShadow:"1px 1px 10px grey",width:"50%",boxSizing:"border-box"}} >
                          {item.text}
                          </p>
                         </div>
                      </div>
                    </div>
                  </div>
                </>
            )
        }):""}
        </>)
    
    
    }
export default Messege;

    
    