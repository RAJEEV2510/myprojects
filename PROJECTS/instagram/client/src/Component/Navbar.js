import React,{useEffect,useContext,} from 'react'
import ReactDOM from 'react-dom'
import './login.css'
import {Link ,useHistory} from 'react-router-dom'
import { usercontext } from '../App'
  const  NavBar=()=>{
  const history=new useHistory();
const {state,dispatch}=useContext(usercontext)

const rednering=()=>{
    if(state)
    {
      
      return [

        <li><Link to="/">Home</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/myfollowerpost">fllwrs Posts</Link></li>,
        <li><Link to="/Createpost">
          Newpost
        
        </Link></li>,
         
        <li>  <button className="btn waves-effect waves-light  #004d40 red darken-1" 
        style={{width:"80px",marginLeft:"10px",marginBottom:"40px",marginTop:"15px"}}
        onClick={()=>{
          localStorage.clear()
        // in dispatch passing the function which returns the object which we passed here
          dispatch({type:"CLEAR"})
          history.push('/login')
        }}>
        Logout
        </button></li>
     
       ]
    }
      else
      {
        return [
          <li><Link to="/login">Login</Link></li>,
          <li><Link to="/signup">SignUp</Link></li>
         
  
        ]
      }
    }

  

// useEffect(()=>{

//   const M=window.M;

//   document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, {});
//   });

// },[])



    return(
        <>
        
        <nav>
        <div className="nav-wrapper blue">
       
    {/*  <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>*/}
          
          <ul id="nav-mobile" className="right">
          {rednering()
          
          }
         
          </ul>
        </div>
   {/*}     <ul id="slide-out" className="sidenav #40c4ff light-blue accent-2">
    <li><div className="user-view">
    
     </div></li>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/signup"  >SignUp</Link></li>
    <li><Link to="/profile">Profile</Link></li>
    
    <li><Link to="/Createpost">createpost</Link></li>
    <li><div className="divider"></div></li>
  </ul>
    */}
    </nav>
    </>
    )
}
export default NavBar;