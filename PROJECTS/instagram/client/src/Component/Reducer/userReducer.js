//use centeral store for data at one state
//initial state is null
export const initialState=null;
function reducer(state,action){
    if(action.type=="USER")
    {
          //change the values in state 
            return action.payload
    }
    if(action.type=="CLEAR")
    {
      return  null;
    }
    if(action.type="UPDATE")
    {
      return {
        ...state,
        followers:action.payload.followers,
        following:action.payload.following
      }
    }
      
     
    
    if(action.type==="updateUser")
    {
      return {
        ...state,
        photo:action.payload
      }

  }
    else
    {
      return  state
    }

}

export default reducer