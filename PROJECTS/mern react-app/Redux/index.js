const redux=require('redux')//store 
const createStore=redux.createStore;//react state
const combineReducers=redux.combineReducers;
const applyMiddleWare=redux.applyMiddleware;
const initialStateBooks={
     
     numberOfBooks:20
    }
const initialStatePens={
       
        numberOfPens:20
       }
//action
const action ={
    type:"BUY_BOOK",
    info:"MY first code Redux"
}
const Baction ={
    type:"BUY_PEN",
    info:"MY first code Redux"
}
//action creator:wrapping the action in a single function
function buyBook(){
        return action;
    }
    //buy pen creater 
function buyPen(){
        return Baction;
}
/// reducer(prevState,action)
const booksReducer=(state=initialStateBooks,action)=>{
switch(action.type)
{   

    //using spread operator so that clone state value
    case ("BUY_BOOK"):
    return{
        //clone state
        ...state,
        numberOfBooks:state.numberOfBooks-1
    }
        default:return state;
}
}
const PensReducer=(state=initialStatePens,action)=>{
    switch(action.type)
    {   
        //using spread operator so that clone state value
        case ("BUY_PEN"):

        return{
            ...state,
            numberOfPens:state.numberOfPens-1
        }
            default:return state;
    }
    }
//pass the Reducer into Store 
const reducer=combineReducers({

    book:booksReducer,
    pen:PensReducer
})
const logger =store=>{

    return next=>{

        return action=>{
                const result=next(action)
                console.log(result)
                return result

        }    
    
    }
    }
const store=createStore(reducer,applyMiddleWare(logger));
//first initial state
console.log("initial state",store.getState())
const unsubscribe=store.subscribe(()=>{console.log("updated state",store.getState())})
store.dispatch(buyBook())
store.dispatch(buyBook())
store.dispatch(buyBook())
store.dispatch(buyBook())
store.dispatch(buyBook())
store.dispatch(buyPen())
store.dispatch(buyPen())
store.dispatch(buyPen())
unsubscribe();

