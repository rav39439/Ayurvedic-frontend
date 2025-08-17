import {
  BOOK_APPOINTMENT_SUCCESS,
  RESCHEDULE_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT_SUCCESS,
  GET_DOCTOR_SUCCESS,
  GET_APPOINTMENT_SUCCESS,
  GET_USER_SUCCESS,
  SET_USER_SUCCESS,
  CONFIRM_APPOINTMENT_SUCCESS
} from "./Actions";

const initialState = {
  tasks: [],
};

const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTOR_SUCCESS:
      console.log(action.payload);
      return { ...state, tasks: [...action.payload] };
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

const appointments = {
  appointments: [],
}; // State starts as null

const appointmentsReducer = (state = appointments, action) => {
   switch (action.type) {
    case GET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: action.payload, // store appointments array
      };

    case RESCHEDULE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};
export { appointmentsReducer, UsersReducer, DoctorReducer };
