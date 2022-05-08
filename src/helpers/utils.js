export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // "user name" => user%20name
    let encodedValue = encodeURIComponent(params[property]); // hi 123 => hi%20123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); //"user%20name=hi%20123"
}
