import React,{useEffect,useState,useContext} from 'react'
import { usercontext } from '../App'
import M from 'materialize-css'
import './login.css'
import { Link } from 'react-router-dom'
const Subs =()=>{
    const {state,dispatch}=useContext(usercontext)
    const [data ,setData]=useState([]);
    const [name,Setname]=useState([])
    const [value,setvalue]=useState(false);
    useEffect(()=>{

        fetch('/getsubpost',{
        
            headers:{
                authorization:"Bearer"+" "+localStorage.getItem("jwt")
            }
        }).then((res)=>{ 
             return res.json() }).then((result )=>{
                           
                setData(result)
                })
        },[])
        
const deletePost=(postId)=>{

    fetch(`/delete/${postId}`,{
        method:"delete",
        headers:{
            "Content-Type":"application/json",
            "authorization":"bearer "+localStorage.getItem('jwt')
         },
        }).then((res)=>{return res.json()}).then((result)=>{

            const newData=data.filter((item)=>{
                    return item._id!=result._id;


            })
                setData(newData);

        })
        }

const likePost=(id)=>{

fetch('/like',{
    method:"put",
    headers:{
        "Content-Type":"application/json",
        "authorization":"bearer "+localStorage.getItem('jwt')
     },
    body:JSON.stringify({
        postId:id
    })
    }).then((res)=>{return res.json()}).then((result)=>{
      
        const newData =data.map((item)=>{
            if(item._id==result._id)
            {
                return result;

            }
            else
            {
                return item;
            }

        })
        setData(newData)
       
            
        
})}
const unlikePost=(id)=>{

    fetch('/unlike',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "authorization":"bearer "+localStorage.getItem('jwt'),  
        },
        body:JSON.stringify({ 
            postId:id
        })
        }).then((res)=>{return res.json()}).then((result)=>{
               
            const newData =data.map((item)=>{
                
                if(item._id==result._id)
                {

                    return result;
    
                }
                else
                {
                    return item;
                }
    
            })
            setData(newData)
          
          
    })}
    
const makeComment=(text,postId)=>{

    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "authorization":"bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:postId,
            text:text

        })
    }).then((res)=>{return res.json() }).then((result)=>{
    
        const newData =data.map((item)=>{
                
            if(item._id==result._id)
            {
                     return result;

            }
            else
            {
                return item;
            }
        })
        setData(newData)
     
     
    })}
return (
    <>
        <div className="home">
        {
            data.map((item)=>{
                return ( <>
                    <div className="card home-card">
                       {item.postedBy._id==state._id?<i class="material-icons" style={{color:"red",float:"right",cursor:"pointer"}} 
                       onClick={()=>{

                        deletePost(item._id)
                       }}
                       >delete </i>:
                    <p></p>
                    } 
                    <h6 style={{fontSize:"10px"}}>Posted By</h6>
                    <h5 style={{textTransform:"capitalize"}}>
                    <Link to={`/profile/${item.postedBy._id}`} style={{color:"black"}}>
                    {item.postedBy.name}</Link>
                   </h5>
                    <div className="card-image">
                    <img className="post" src={item.photo}></img>
                    </div>
                    <div className="card-content"></div>
                    <i class="material-icons" style={{color:"red"}} >favorite </i>
                    &emsp;&emsp;
                    {item.likes.includes(state._id)?
                            <i class="material-icons likes" style={{color:"blue"} } 
                            onClick={
                                ()=>{unlikePost(item._id)}}
                            >thumb_down </i>:
                            <i class="material-icons likes" style={{color:"blue"}} onClick={
                                ()=>{likePost(item._id)}}>
                                
                                thumb_up </i>
                    }
                    <h6>  {item.likes.length} likes  </h6>
                    <h6 style={{boxSizing:"border-box",width:"50%"}}>  {item.title}  </h6>
                    <p
                    style={{boxSizing:"border-box",width:"50%"}}>{item.body}
                    </p>
                    <button class=  " waves-light btn-small" onClick={()=>{setvalue(true)}}>
                    {item.comments.length} &emsp;
                     comments</button>
                    &emsp;&emsp;&emsp;
                    <button  class=" waves-light btn-small" onClick={()=>{setvalue(false)}}>hide comment</button>
                    <br></br>
                    {item.comments.map((record=>{

                        return(<>
                        {value?
                           
                            <>
                            <h6 style={{boxShadow:"1px 1px 10px grey",width:"200px",boxSizing:"border-box",padding:"10px",marginTop:"10px"}}>
                            By &emsp; {record.postedBy.name}</h6>
                            
                            
                            <p>{record.text}</p>
                            </>
                            :<p></p>
                            
                        } </>)
                    }))}
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        if(e.target[0].value==="")
                        {
                            M.toast({html:"comment empty",classes:"#b71c1c red darken-4"})       
                        }
                      else{
                       makeComment(e.target[0].value,item,item._id)
                       e.target[0].value=""
                       M.toast({html:"comment submitted",classes:"#b71c1c red darken-4"})
                      }
                    }}>
                    <input type="text" placeholder="add a comment"></input>
                    <button class="btn waves-effect #4a148c purple darken-4" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                  </button>  </form>
                    </div>
                        </>
                        )})
                     
                    }</div>
                </>)}
export default Subs