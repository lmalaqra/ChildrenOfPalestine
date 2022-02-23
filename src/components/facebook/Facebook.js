import { useEffect, useState, useContext } from "react";
import { userContext } from "../../userContext";
import axios from "axios";
import { useNavigate } from "react-router";

import * as queryString from "query-string";

const Facebook = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const code = urlParams.code;
    axios({
      url: "https://graph.facebook.com/v4.0/oauth/access_token",
      method: "get",
      params: {
        client_id: "237085085289850",
        client_secret: "7b03224e99c6509fbdad465b2ab72afa",
        redirect_uri: "http://localhost:3000/api/facebook",
        code,
      },
    }).then((res) => {
      axios
        .post("/facebook/auth", { token: res.data.access_token })
        .then((res) => {
          localStorage.setItem("id", JSON.stringify(res.data.id));
          localStorage.setItem("loggedIn", JSON.stringify(true));
          console.log(res.data);
          setUser((prev) => {
            return {
              ...prev,
              loggedIn: true,
              id: res.data.id,
            };
          });
        })
        .then(() => {
          navigate("/");
        });
    });
  }, []);

  return <div></div>;
};

export default Facebook;
