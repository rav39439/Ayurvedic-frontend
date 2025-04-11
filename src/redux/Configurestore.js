import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {  UsersReducer,messageReducer, BookReducer,commentsReducer} from "./Reducers";
//const ConfigureStore=()=>{


const reducer = combineReducers({
  BookReducer,
    UsersReducer,
    messageReducer,
    commentsReducer

   
  })
  const store = configureStore({
    reducer
  })
  export default store;