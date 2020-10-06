const redux=require('redux')//module require 
const createStore=redux.createStore;
const initialState={
    name:"RAJEEV KUMAR",
    num:23451235}
const action={
    type:"adhar",
    payload:"change my adhaar card name"
    }
function namechange()
{
    return action;
}
function numchange()
{

    return {
        type:"Number change",
        payload:"change adhar number"
    }
}
//reducer(prevstate,action)
const Reducer=(state=initialState,action)=>{
{
    switch(action.type)
    {

        case("adhar"):
        return {
            ...state,
            name:"KAPIL",}
        case("Number change"):
        return { ...state,num:123456}
            default:
            return state
         }}}
const store=createStore(Reducer);
console.log("initial state",store.getState());
const unsubscribe=store.subscribe(()=>{console.log("updated state",store.getState())});
store.dispatch(namechange());
store.dispatch(namechange());
store.dispatch(namechange());
store.dispatch(numchange());
unsubscribe();

