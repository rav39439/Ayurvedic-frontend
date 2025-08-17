import * as api from "./api"; // Always place imports at the top
import axios from "axios";


export const BOOK_APPOINTMENT_SUCCESS = "BOOK_APPOINTMENT_SUCCESS";
export const CONFIRM_APPOINTMENT_SUCCESS ="CONFIRM_APPOINTMENT_SUCCESS";

export const CANCEL_APPOINTMENT_SUCCESS = "CANCEL_APPOINTMENT_SUCCESS";

export const GET_APPOINTMENT_SUCCESS = "GET_APPOINTMENT_SUCCESS";

export const GET_DOCTOR_SUCCESS =  "GET_DOCTOR_SUCCESS"
export const RESCHEDULE_APPOINTMENT_SUCCESS = "RESCHEDULE_APPOINTMENT_SUCCESS";

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
// export const GETDATA = "GETDATA";
// export const UPDATEDATA = "UPDATEDATA";
// export const DELETEDATA = "DELETEDATA";




export const getdoctors = (user) => async (dispatch) => {
  console.log(user)
  try {
    if (user !== null) {
      const { data } = await api.getalldoctors();
     
      dispatch({ type: "GET_DOCTOR_SUCCESS", payload: data.items });
    } else {
      dispatch({ type: "GET_DOCTOR_SUCCESS", payload: [] });
    }
  } catch (err) {
    console.log(err);
  }
};



export const getdoctorsbyId = async(bookid) => {
  try {
      const { data } = await api.getdoctorsbyId(bookid);
      return data
    
  } catch (err) {
    console.log(err);
  }
};

export const fixappointment = async(d) => {
  console.log(d)
  try {
    const { data } = await api.fixappointment(d);    
    console.log(data)

    return data
    // dispatch({ type: "BOOK_APPOINTMENT_SUCCESS", payload: appointment });
  } catch (err) {
    console.log(err);
    return err
  }
};



export const Confirmappointment = async(d) => {
  try {
    const { data } = await api.Confirmappointment(d);    
    // dispatch({ type: "CONFIRM_APPOINTMENT_SUCCESS", payload: appointment });
    return data
  } catch (err) {
    console.log(err);
  }
};


export const rescheduleappointment = async(d)=> {
  try {
    console.log(d)
    const { data } = await api.rescheduleAppointment(d);    
    console.log(data)

    return data
    // dispatch({ type: "GET_APPOINTMENT_SUCCESS", payload: appointment });
  } catch (err) {
    console.log(err);
  }
};

export const getPastAppointmentsByPhone = (d)=> async (dispatch) => {
  try {
    console.log("asdggggggggggggggggggggggggggggggggggg")
    const { data } = await api.getPastAppointmentsByPhone(d); 
        dispatch({ type: "GET_APPOINTMENT_SUCCESS", payload: data.appointments});

        console.log(data)

  } catch (err) {
    console.log(err);
  }
};

export const getUpcomingAppointmentsByPhone = (d)=> async (dispatch) => {
  try {
    const { data } = await api.getUpcomingAppointmentsByPhone(d); 
    console.log(data)
        dispatch({ type: "GET_APPOINTMENT_SUCCESS", payload: data.appointments });
        console.log(data)

    // return data   
  } catch (err) {
    console.log(err);
  }
};


export const Cancel = async(d) => {
  try {
    console.log(d)
    const { data } = await api.Cancel(d);   

    // dispatch({ type: "UPDATE_APPOINTMENT_SUCCESS", payload: appointment });
    return data
  } catch (err) {
    console.log(err);
  }
};

export const cancelandremove = async(d) => {
  try {
    console.log(d)
    const { data } = await api.cancelandremove(d);   

    // dispatch({ type: "UPDATE_APPOINTMENT_SUCCESS", payload: appointment });
    return data
  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user) => ({
  type: SET_USER_SUCCESS,
  payload: user,
});

export const getUser = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.SignUp(authData);

    // dispatch({ type: "SET_TASK_NULL",payload:[] });
    // dispatch({ type: "AUTH", data });
    // dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    //  navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    console.log(authData)
    const { data } = await api.logIn(authData);   
    console.log(data)
    dispatch({ type: "AUTH", data });
    dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(getdoctors());
    navigate("/");
  } catch (err) {
    dispatch({type:'CHANGE',payload:err.response.data})
  }
};


