function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

function convertEmail(email) {
  return replaceAll(email, ".", "-");
}

export default convertEmail;
