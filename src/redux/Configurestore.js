import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {  UsersReducer,DoctorReducer,appointmentsReducer} from "./Reducers";
//const ConfigureStore=()=>{


const reducer = combineReducers({
  
    UsersReducer,
    DoctorReducer,
    appointmentsReducer,

   
  })
  const store = configureStore({
    reducer
  })
  export default store;