import React, { useEffect,useState

 } from "react";
 import {useDispatch} from 'react-redux'
 import Login from "./Pages/Login/Login";
import Comment from "./components/comments/Comment";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  getBook } from "./redux/Actions"; // Fixed import
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import { setUser } from "./redux/Actions";
import Register from "./Pages/Register/Register";
import Booktable from "./Pages/Booktable/Booktable";
import Bookview from "./components/bookview/Bookview";
const mapStateToProps = (state) => ({
  currentuser: state.UsersReducer, // Ensure these match your actual reducer names
  tasks: state.BookReducer, // Fixed reducer name
  messages: state.messageReducer, // Fixed reducer name
  // duptasks: state.dupReducer, // Fixed reducer name

});

const mapDispatchToProps = (dispatch) => ({
  getBook: () => dispatch(getBook()),
});

function App(props) {
  const [isTableView, setIsTableView] = useState(true);

  const dispatch=useDispatch()
   const navigate=useNavigate()
  const handleLogout=()=>{
    // dispatch({type:'LOGOUT'})
    localStorage.removeItem('Profile');

    navigate('/')
    dispatch(setUser(null))
  }

useEffect(()=>{

let userdata=JSON.parse(localStorage.getItem('Profile'))
    dispatch(getBook(userdata))
    // console.log("getting books")
    // setTimeout(()=>{
    //   console.log("after")

      //  console.log(props)

    // },4000)
    // dispatch(dupTask(userdata))

    if(localStorage.getItem('Profile')!==null){
      let data=JSON.parse(localStorage.getItem('Profile'))
      dispatch(setUser(JSON.parse(localStorage.getItem('Profile'))))

    // const token=data?.token
    // if(token){
    //     const decodedToken=jwtDecode(token)
    //     // console.log(decodedToken)
    //     if(decodedToken.exp*1000<new Date().getTime()){
    //         handleLogout()

    //     }
    // }
  }
},[dispatch])

const handleToggle = () => {
  setIsTableView((prevState) => !prevState);
};
  return (
    <div className="App">
     <Navbar tasks={props?.tasks?.tasks} userInfo={props.currentuser}/>

    

        <Routes>
          <Route exact path="/" element={props.currentuser?.user!==null? <Booktable currentUser={props.currentuser} tasks={props?.tasks?.tasks} />:<Login />} />
          <Route exact path="/Login" element={<Login  currentMessage={props.messages} />} />
          <Route exact path="/Register" element={<Register />} />

          <Route exact path="/viewcomments/:id" element={<Comment />} />

          <Route exact path="/viewbook/:id" element={<Bookview />} />

        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

