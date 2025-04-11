import {
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  SET_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_BOOK_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SET_MESSAGE_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_COMMENT_SUCCESS,
  // SET_TASK_NULL,
  // SET_TASK_SUCCESS,
  // DUP_TASK_SUCCESS,
  // SET_DUPTASK_NULL,
  // ADD_DUPTASK_SUCCESS,
  // DELETE_DUPTASK_SUCCESS

} from "./Actions";

const initialState = {
  tasks: [

  ],
};

const BookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload], // ✅ Append new task to existing tasks
      };

    case GET_BOOK_SUCCESS:
      console.log(action.payload)
      return{...state,tasks:[...action.payload]}


    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(
          (task) => (task._id === action.payload._id ? action.payload : task) // ✅ Update existing task
        ),
      };

    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task._id !== action.payload // ✅ Update existing task
        ),
      };

    default:
      return state;
  }
};

const comments= {
  comments: [

  ],
};

const commentsReducer = (state = comments, action) => {
  switch (action.type) {
    // case ADD_COMMENT_SUCCESS:
    //   return {
    //     ...state,
    //     comments: [...state.comments, action.payload], // ✅ Append new task to existing tasks
    //   };

    case GET_COMMENT_SUCCESS:
      console.log("sdafasfa")
      console.log(action.payload)
      return{...state,comments:[...action.payload.reviews]}
    default:
      return state;
  }
};



// New Users Reducer
const initialStateuser = null; // State starts as null

const UsersReducer = (state = initialStateuser, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return {
        ...state, // Ensure existing state is preserved
        user: action.payload, // Store user object
      };

    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };

    case GET_USER_SUCCESS:
      return state; // Return the current state when retrieving user

    default:
      return state; // Ensure default state is returned
  }
};


const initialMessage = null; // State starts as null

const messageReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case SET_MESSAGE_SUCCESS:
      return {
        ...state, // Ensure existing state is preserved
        message: action.payload, // Store user object
      };

    case "CHANGE":
      return { ...state, data: action?.payload };

    case GET_MESSAGE_SUCCESS:
      return state; // Return the current state when retrieving user

    default:
      return state; // Ensure default state is returned
  }
};

export { BookReducer, UsersReducer ,messageReducer,commentsReducer};
