import React, { useEffect, useState, useContext } from 'react';
import './login.css'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { usercontext } from '../App'
import M from 'materialize-css'
function Profile() {


    const { state, dispatch } = useContext(usercontext)
    const [pics, setpics] = useState([])
    const [data, setData] = useState([])
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    const history=useHistory();
    useEffect(() => {
        //get request
        fetch('/mypost', {

            headers: {
                authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => { return res.json() }).then((data) => {
       
            setpics(data);

        })

    }, [])

    useEffect(() => {
        if (image) {
          
            const data = new FormData();
            data.append("file", image)
            data.append('upload_preset', "Leechi")
            data.append('cloud_name', "rajeev")
            fetch('	https://api.cloudinary.com/v1_1/rajeev/image/upload/', {
                method: "post",
                mode: "cors",
                body: data

            }).then(res => { return res.json() }).then(data => {
                
             
                alert( "ok to uplaod 🔃")
                fetch('/updatepic',{
                    method:"put",
                    headers: {
                        "Content-Type":"application/json",
                        authorization: "Bearer " + localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({photo:data.url})    
               
                    }).then(res=>{return res.json()}).then((data)=>{
             

                    })
                    localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
               
                dispatch({type:"updateUser",payload:data.url})
                
                M.toast({html:"photo update successfully in few sec",classes:"#b71c1c red darken-4"})                
                window.location.reload()
                setUrl(data.url)
               
            }).catch((err) => console.log(err))

        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)

    }

    return (<>
  
        {state?state.followers!=undefined?
        <div style={{ margin: "2px auto", maxWidth: '800px' }}>

            <div style={{ display: "flex", justifyContent: 'space-around', margin: '18px 0px', width: '100%' }}>
                <div>
                   
                    <img src={state ? state.photo : "loading"} style={{marginLeft:"20px", width: "110px", height: "110px", borderRadius: "55px" }} alt="no image"></img>
                    <div className="file-field input-field" style={{ marginTop: "40px" }}>
                        <div className="btn" >
                            <span style={{ marginTop: "30px" }}>Update Pic</span>
                            <input type="file" placeholder="upload image" onChange={e => updatePhoto(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper" style={{ padding: "10px" }}>
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <h5 style={{ textTransform: "capitalize", fontFamily: "sans-serif" }}>{state ? state.name : "loading"}</h5>
                    <div style={{ display: "flex", justifyContent: 'space-around', width: "108%" }}>
                        <h6>{pics.length}  post</h6>
                        <h6>{state?state.followers.length: ""} follower</h6>
                        <h6>{state?state.following.length: ""} following</h6>
                    </div>
                    <Link to={`/viewmsg`}>
                        <button className="btn waves-effect  #004d40 blue darken-4"
                            style={{ height: '30px', lineHeight: "15px", marginTop: "5px", marginRight: "2%", width: 'auto' }}>
                            View Message
                 </button>
                    </Link>
                </div>

            </div>
            <hr></hr>
            <div className="gallery">
                {pics.map((item, id) => {
                    return (<>

                        <img className="item" src={item.photo} alt="no image" key={id} style={{
                            height: "190px",
                            width: "170px",
                            margin: "40px auto",

                        }}></img>
                    </>)

                })}

            </div>
        </div>
        :"loading":""}
        </>
    )
}

export default Profile;
