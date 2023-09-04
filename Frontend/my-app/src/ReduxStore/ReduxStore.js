// Define action types
const SET_USERNAME = "SET_USERNAME";
const LOGOUT = "LOGOUT";

// Retrieve data from localStorage
const username = localStorage.getItem("username") || "";
const userId = localStorage.getItem("id") || "";

// Initial state
const initialState = {
  username: username,
  userId: userId,
};

// Action creators
export const logout = () => ({
  type: LOGOUT,
});

export const setUsername = (newUsername) => ({
  type: SET_USERNAME,
  payload: newUsername,
});

// Reducer
const userStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      console.log(username);
      // Update localStorage when setting the username

      return { ...state, username: action.payload };
    case LOGOUT:
      // Clear localStorage and reset the state to its initial values
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default userStore;
