import React ,{useState,useEffect,useContext} from 'react';
import {usercontext} from '../App'
import M from 'materialize-css'
import {Link,useHistory} from 'react-router-dom'
import './login.css'
function Login() {
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory();
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData=()=>{

        if(!email || !password)
        {
            M.toast({html:"fill the details",classes:"#b71c1c red darken-4"})                
            return 
        }

    else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {

        fetch("/signin",{
     
     method:"post",
     headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email:email,
        password:password,

    })

}).then((res)=>{

    return res.json()
}).then(data=>{

    if(data.error)
    {
        M.toast({html:data.error,classes:"#b71c1c red darken-4"})
    }
    
    else{
        

        localStorage.setItem('jwt',data.token)
    
        localStorage.setItem('user',JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
     
        M.toast({html:"sign in success fully",classes:"#b71c1c green darken-4"})
        history.push('/')
    }
    }).catch((err)=>{console.log(err)})
   
}
else
{   
    M.toast({html:"email is invalid",classes:"#b71c1c red darken-4"})
    history.push('/login')

}
}

    return (
        <div className="Mycard">
        <div className="card auth-card">
            <h2 className="leechi">Leechi</h2>
        <input type="email" className="field" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required></input>
        <input type="password" className="field" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required></input>
        <button className="btn waves-effect waves-light #004d40 teal darken-4" onClick={PostData}>
                Login
             </button>
             <h6>
             <Link to="/signup">Don't Have an account ? </Link>
             </h6>     
        </div>
        </div>
    )
}

export default Login;
