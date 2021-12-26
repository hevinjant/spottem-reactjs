import { combineReducers } from "redux";
import { actionTypes } from "./action";

function tokenReducer(state = {}, action) {
  if (action.type === actionTypes.SET_ACCESS_TOKEN) {
    return {
      access_token: action.payload.access_token,
    };
  }

  return state;
}

function userInfoReducer(state = {}, action) {
  if (action.type === actionTypes.SET_USER_INFO) {
    return {
      display_name: action.payload.display_name,
      email: action.payload.email,
      image_url: action.payload.image_url,
    };
  }
  return state;
}

const reducers = combineReducers({
  token: tokenReducer,
  userInfo: userInfoReducer,
});

export default reducers;
