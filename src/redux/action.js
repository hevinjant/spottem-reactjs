export const actionTypes = {
  SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
  SET_USER_INFO: "SET_USER_INFO",
};

export function setAccessToken(token) {
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    payload: {
      access_token: token,
    },
  };
}

export function setUserInfo(displayName, email, imageUrl) {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: {
      display_name: displayName,
      email: email,
      image_url: imageUrl,
    },
  };
}
