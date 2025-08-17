import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./Pages/Login/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getdoctors } from "./redux/Actions"; // Fixed import
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "./redux/Actions";
import Register from "./Pages/Register/Register";
import AppointmentCards from "./Pages/AppointmentCards/AppointmentCards";
import AppointmentView from "./components/AppointmentView/AppointmentView";
import Appointments from "./components/Appointments/Appointments";
const mapStateToProps = (state) => ({
  currentuser: state.UsersReducer,
  tasks: state.DoctorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getdoctors: () => dispatch(getdoctors()),
});

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Profile");

    navigate("/");
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(getdoctors());
    if (localStorage.getItem("Profile") !== null) {
      dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    }
    
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar tasks={props?.tasks?.tasks} userInfo={props.currentuser} />

      <Routes>
        <Route
          exact
          path="/"
          element={
            props.currentuser?.user !== null && props.currentuser !== null ? (
              <AppointmentCards
                currentUser={props.currentuser}
                tasks={props?.tasks?.tasks}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/Login"
          element={<Login currentMessage={props.messages} />}
        />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/viewAppoints/:id" element={<AppointmentView />} />
        <Route exact path="/showAppointments/:id" element={<Appointments />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
