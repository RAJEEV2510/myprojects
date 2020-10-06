import React,{useState,useContext,useEffect} from 'react';
import { usercontext } from '../App'
function ViewMessages() {
const [data,setData]=useState([]);
const [id,setId]=useState("");
const {state,dispatch}=useContext(usercontext)
useEffect(()=>{
    fetch(`/viewmsg`,{

        method:'get',
       headers:{
            "Content-Type":"application/json",
            authorization:"bearer "+localStorage.getItem("jwt")
        },
    }).then(res=>{return res.json()}).then((result)=>{
            setId(result._id);
      
          
    })


},[])
const show=()=>{fetch(`/viewmsg`,{

    method:'get',
   headers:{
        "Content-Type":"application/json",
        authorization:"bearer "+localStorage.getItem("jwt")
    },
}).then(res=>{return res.json()}).then((result)=>{
        setId(result._id);
        setData(result.messages);
      
})
}
    return (
        <>
     
        <div>
         {state && id?state._id==id
            ?<button className="btn waves-effect  #004d40 blue darken-4" 
            style={{height:'30px',lineHeight:"15px",marginTop:"45px",marginRight:"2%",width:'auto'}} onClick={()=>{

                show()
            }}>
            Show Your Messages
        </button>      :"" 
     
            :""}   
        </div>


        {data?data.map((item)=>{
                 return(
                        <>
                        <div style={{margin:" 20px auto"}}>
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
                      </div>
                    </>
                )
            }):"LOADING"}
        
            </>
    )
}

export default ViewMessages;
