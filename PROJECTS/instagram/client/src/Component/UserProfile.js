import React,{useEffect,useState,useContext} from 'react';
import './login.css'
import {useParams,Link}  from 'react-router-dom'
import { usercontext } from '../App'
function UserProfile() {
    const {state,dispatch}=useContext(usercontext)
    const [showfollow,setfollow]=useState(true)
    const [pics,setpics]=useState([])
    const {Id}=useParams();
    useEffect(()=>{
        //get request
        fetch(`/user${Id}`,{

            headers:{
                authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>{

            return res.json()}).then((data)=>{
                
            setpics(data);
        })
})
const follow=()=>{

    fetch('/follow',{

        method:'put',
        headers:{
            "Content-Type":"application/json",
            authorization:"Bearer "+localStorage.getItem("jwt")
        },
         body:JSON.stringify({followId:Id})
    }).then(res=>{return res.json()}).then((data)=>{
        //user object override the prevstate
        setpics((prevState)=>{
            return {
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data.id]

                }
            }

        })
        setfollow(false)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        

    })
}

const unfollow=()=>{
   
    fetch('/unfollow',{

        method:'put',
        headers:{
            "Content-Type":"application/json",
            authorization:"Bearer "+localStorage.getItem("jwt")
        },
     body:JSON.stringify({followId:Id})
    }).then(res=>{return res.json()}).then((data)=>{
        //user object override the prevstate
        setpics((prevState)=>{
            const newFollower=prevState.user.followers.filter(item=>item!=data._id)
            return {
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:newFollower

                }
            }

        })
        setfollow(true)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        

    })

}


    return (<>
        
{pics.user?
        <div style={{margin:"2px auto",maxWidth:'800px'}}>

        <div style={{ display: "flex", justifyContent: 'space-around', margin: '18px 0px',width:'100%' }}>
            <div>
                <img src={pics.user.photo} style={{ width: "110px", height: "110px", borderRadius: "55px",
            marginRight:"30px"
            }} alt="no image"></img>
            </div>
            <div>
                <h5 style={{textTransform:"capitalize",fontFamily:"sans-serif"}}>{pics.user.name}</h5>
                <div style={{ display: "flex", justifyContent: 'space-around', width: "108%" }}>
                    <h6>{pics.posts.length}  post</h6>
                    <h6>{pics.user.followers.length}&nbsp;folllowers</h6>
                    <h6>{pics.user.following.length} following</h6>
                </div>
                {pics.user.followers.includes(state._id)? <button className="btn waves-effect  #004d40 blue darken-4" onClick={()=>{unfollow()
                }}
                style={{height:'30px',lineHeight:"15px",marginTop:"5px",marginRight:"2%",width:"200px"}}>
                unfollow
             </button>:

               
             <button className="btn waves-effect  #004d40 blue darken-4" onClick={()=>{

                follow()
            }}
        style={{height:'30px',lineHeight:"15px",marginTop:"5px",width:"150px",boxSizing:"border-box",
        paddingLeft:"6px"}}
            >
            follow
         </button>
        
        }               
        <Link to={`/message/${Id}`}>
        <button className="btn waves-effect  #004d40 blue darken-4" 
        style={{height:'30px',lineHeight:"15px",marginTop:"5px",marginRight:"2%",width:'200px'}}>
    Private Message
     </button>
     </Link>
            </div>
            
        </div>
        <hr></hr>
        <div className="gallery">
        {pics.posts.map((item,id)=>{
            return(<>
                
                <img className="item" src={item.photo}  alt="no image" key={id} style={{
                    height:"190px",
                    width:"170px",
                    margin:"40px auto",
                
            }}></img>
                </>)

        })}            
  
        </div>
    </div>:<h1 style={{textAlign:"center"}}>loading</h1>}

</>
    )
}
export default UserProfile;
