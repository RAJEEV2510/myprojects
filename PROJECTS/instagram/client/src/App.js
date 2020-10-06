import React, { useEffect, createContext, useReducer, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './Component/UserProfile'
import NavBar from './Component/Navbar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './Component/Screen'
import Profile from './Component/Profile'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Messege from './Component/Message'
import Createpost from './Component/Createpost'
import reducer, { initialState } from './Component/Reducer/userReducer';
import ViewMessages from './Component/ViewMessages'
import Subs from './Component/SuscriberUserPosts'
import Security from './Component/Security'
import Contactus from './Component/Contactus'
//sending data through component
//for passing the data
export const usercontext = createContext();
//navbar always inside the Browse router
const Routing = () => {
  //for navigating

  const history = new useHistory();
  //value digging using destructring
  const { state, dispatch } = useContext(usercontext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: "USER", payload: user })
    
      history.push('/');
   
      
    }
    if(!user) {
      history.push('/login')
    }
  },[])


  return (
    <>
      <Switch>
      
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/Createpost">
          <Createpost></Createpost>
        </Route>
        <Route exact path="/profile/:Id">
        <UserProfile></UserProfile>
      </Route>
      <Route exact path="/message/:Id">
      <Messege></Messege>
            </Route>
      <Route exact path="/viewmsg">
        <ViewMessages></ViewMessages>
        </Route>
        <Route exact path="/myfollowerpost">
        <Subs></Subs>
        </Route>
        <Route exact path="/security">
        <Security></Security>
        </Route>
        <Route exact path="/contactus">
        <Contactus></Contactus>
        </Route>
          
      </Switch>
    </>
  )

}
function App() {
  //in use reducer pass the reducer and intital state
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <usercontext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routing></Routing>
        </BrowserRouter>
      </usercontext.Provider>
    </>
  );
}

export default App;
