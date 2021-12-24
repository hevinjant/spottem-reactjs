import { createReducer } from "@reduxjs/toolkit";

export default function reducer(state = {}, action) {
  if (action.type === "SET_ACCESSTOKEN") {
    return {
      access_token: action.payload.access_token,
    };
  }
  if (action.type === "SET_USERINFO") {
    return {
      display_name: action.payload.display_name,
      email: action.payload.email,
      image_url: action.image_url,
    };
  }
  return state;
}

// const initialState = {
//   accessToken: undefined,
// };

// const LoginReducer = createReducer(initialState, {
//   ["SET_ACCESSTOKEN"]: (state, action) => {
//     state.accessToken = action.payload.accessToken;
//   },
// });

// export default Reducer;
