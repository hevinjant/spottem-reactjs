function replaceAll(string, search, replace) {
  if (string === null) {
    return "";
  }
  return string.split(search).join(replace);
}

function convertEmail(email) {
  return replaceAll(email, ".", "-");
}

export default convertEmail;
