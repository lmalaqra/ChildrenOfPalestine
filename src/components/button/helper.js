import axios from "axios";

function postData() {
  axios
    .post("http://localhost:3001/userinfo")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
