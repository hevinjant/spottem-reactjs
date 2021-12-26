function reducer(state = {}, action) {
  if (action.type === "SET_ACCESSTOKEN") {
    return {
      access_token: action.payload.access_token,
    };
  }
  if (action.type === "SET_USERINFO") {
    return {
      display_name: action.payload.display_name,
      email: action.payload.email,
      image_url: action.payload.image_url,
    };
  }
  return state;
}

export default reducer;
