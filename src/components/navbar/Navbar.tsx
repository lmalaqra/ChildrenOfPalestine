import { ReactElement, ReactNode,useState,useEffect,useRef,useContext } from "react";  
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import "./navbar.css"

import { useScroll } from "./helper";
import { userContext } from "../../userContext";

 const NavBar=(props:any)=>{
     const navigate=useNavigate();

const [scroll,isScroll]=useScroll();


    return <div  className={`grid ${props.navState?"active":"navbar"}`}>

        <div className="logo col">
            <img style={{width:"20%" ,fill:"white",color:"white"}} src="/assets/images/rageHook.svg" alt="logo"/>
        </div>
        <div className="pages col">

 <Link className="link" to="/"> Home </Link>  
<Link className="link" to="/feed">  News Feed  </Link>
<Link className="link" to="/blog">  Blog  </Link>

{props.user.loggedIn?<h1>{props.user.id}</h1>:<><a  className="link" role="button" href="#" >sign in </a>
            <button onClick={()=>{navigate('/signup');console.log('buttom clicked')}} className="btn"  title="signUp" >Get Started </button></>}
            

      

                
        </div>
    
    </div>






}



export default NavBar;