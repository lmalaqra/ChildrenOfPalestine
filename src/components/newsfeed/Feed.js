import {
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import { userContext } from "../../userContext";
import { GoogleLogin } from "react-google-login";
import * as queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: "237085085289850",
  redirect_uri: "http://localhost:3000/api/facebook",
  scope: ["email"], // comma seperated string
  response_type: "code",
  auth_type: "rerequest",
  display: "popup",
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

const Feed = () => {
  const { user, setUser } = useContext(userContext);

  const onGoogleSuccess = async (response) => {
    const res = await axios.post("api/google", response);
    localStorage.setItem("id", JSON.stringify(res.data.id));
    localStorage.setItem("loggedIn", JSON.stringify(true));
    setUser((prev) => {
      return {
        ...prev,
        loggedIn: true,
        id: res.data.id,
      };
    });
  };

  const onGoogleFailure = () => {};

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const userId = localStorage.getItem("id");
    if (!loggedIn) return;
    setUser((prev) => {
      return {
        ...prev,
        loggedIn: JSON.parse(loggedIn),
        id: JSON.parse(userId),
      };
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151a30",
        color: "white",
      }}
    >
      <h1>Google Oauth Sign In</h1>
      {user.loggedIn ? (
        <h1>your are already logged in </h1>
      ) : (
        <GoogleLogin
          clientId="267770549784-7rqpgrv4vrm0ms114s9ln6dlmirfdcko.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          className="google-login-button"
        />
      )}
      <h1>Facebook Auth</h1>
      <a href={facebookLoginUrl}>Login with Facebook</a>
    </div>
  );
};
export default Feed;
