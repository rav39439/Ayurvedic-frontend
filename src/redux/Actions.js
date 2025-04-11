import * as api from "./api"; // Always place imports at the top

export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";

export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";


export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const SET_MESSAGE_SUCCESS = "SET_MESSAGE_SUCCESS";

export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const GET_BOOK_SUCCESS = "GET_BOOK_SUCCESS";

export const addBook =
  (
   author,
   title,
   year,
   genre,
   description
    ) =>
  async (dispatch) => {
    try {
      let Bookdata = {
        author,
        title,
        year,
        genre,
        description
      };
      console.log(Bookdata)
      const { data } = await api.addnewbook(Bookdata);
      // let userdata = JSON.parse(localStorage.getItem("Profile"));
      dispatch(getBook());
    } catch (err) {
      console.log(err);
    }
  };


export const getBook = (user) => async (dispatch) => {
  try {
    if (user !== null) {
      const { data } = await api.getallbooks();
    console.log(data)
     
      dispatch({ type: "GET_BOOK_SUCCESS", payload: data });
    } else {
      dispatch({ type: "GET_BOOK_SUCCESS", payload: [] });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addComment = (commentdata) => async (dispatch) => {
  try {
    console.log(commentdata)
 
      const { data } = await api.addComment(commentdata);
     
      // dispatch({ type: "ADD_COMMENT_SUCCESS", payload: data });
  
  } catch (err) {
    console.log(err);
  }
};

export const getComment = (bookid) => async (dispatch) => {
  try {
      const { data } = await api.getComment(bookid);
     
      dispatch({ type: "GET_COMMENT_SUCCESS", payload: data });
    
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = (task, id) => async (dispatch) => {
  try {
    const { data } = await api.updatebook(task, id);

    const dateObject = new Date(task.duedate);

    // Convert Date object to ISO format
    const isoDate = dateObject.toISOString();
    task.duedate = isoDate;

    dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: task });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletebook(id);

    dispatch({ type: "DELETE_BOOK_SUCCESS", payload: id });
    // dispatch({ type: "DELETE_DUPTASK_SUCCESS", payload: id });

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
    const { data } = await api.logIn(authData);
    console.log(data)
   
    
    dispatch({ type: "AUTH", data });
    dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(getBook());

    navigate("/");
  } catch (err) {
    dispatch({type:'CHANGE',payload:err.response.data})
  }
};
