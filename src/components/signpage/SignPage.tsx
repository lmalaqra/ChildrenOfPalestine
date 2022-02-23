import { ReactElement, ReactNode,useState,useEffect,useRef,useContext } from "react";
import SignUp from "../signUp/Signup";
import "./signPage.css";
import useWindowDimensions from "../../services/service"    
import axios from "axios";
import { userContext } from "../../userContext";
import { GoogleLogin } from "react-google-login";
import * as queryString from "query-string";
import { useNavigate } from "react-router";
const stringifiedParams = queryString.stringify({
    client_id: "237085085289850",
    redirect_uri: "http://localhost:3000/api/facebook",
    scope: ["email","public_profile"], // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });
  
  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  
  



const SignPage:React.FC<any>=():JSX.Element=>{




const {width,height}= useWindowDimensions();
const { user, setUser } = useContext(userContext);
const navigate=useNavigate();




const onGoogleSuccess = async (response:any) => {
  const res = await axios.post("api/google", response);
  localStorage.setItem("id", JSON.stringify(res.data.id));
  localStorage.setItem("loggedIn", JSON.stringify(true));
  setUser((prev:any) => {
    return {
      ...prev,
      loggedIn: true,
      id: res.data.id,
    };
  });
  navigate('/');

};

const onGoogleFailure = () => {};

useEffect(() => {
  const loggedIn = localStorage.getItem("loggedIn");
  const userId = localStorage.getItem("id");
  if (!loggedIn) return;
  setUser((prev:any) => {
    return {
      ...prev,
      loggedIn: JSON.parse(loggedIn),
      id: JSON.parse(userId),
    };
  });
}, []);



return<div style={{height:`${height}px`}}   className ="page-container">
<div  className="sign-form">
    <SignUp/>
</div>

<div className="line" >

    <div className="circle">OR</div>
</div>
<a href="https://www.googleapis.com/auth/user.gender.read">onothergoogle</a>
<div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
          scope={"https://www.googleapis.com/auth/user.birthday.read"}
        />
      )}
      <h1>Facebook Auth</h1>
      <a className="facebook" href={facebookLoginUrl}>Login with Facebook</a>
    </div>
    </div>

}
export default SignPage