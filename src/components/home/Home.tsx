import { ReactElement, ReactNode,useState,useEffect,useRef } from "react";
import "./home.css"
import SignUp from "../signUp/Signup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { userContext } from "../../userContext";






const Home=(props:any)=>{
    const ref=useRef();
    const options:any={
        root: null,
        rootMargin:"0px",

        threshold:0.2
    }
const value=useContext(userContext);
useEffect( ()=>{
// const token=JSON.parse( localStorage.getItem('user'));
const observer=new IntersectionObserver((entries)=>{

const [entry]=entries;
if(entry.isIntersecting){
props.onChange(true)
}else{
props.onChange(false)
    
}


},options);


if(ref.current)observer.observe(ref.current);


return ()=>{

observer.unobserve(ref.current);

}

},[]);

    return< div className="home-container">
        <div ref={ref}  className="home-content grid">
<div className="home-description">
    <h2>
this is a demo  <br/> if how to build a<br/> WebApp

    </h2>
    <h1>It's easy and free to post your thinking on any topic and<br/> connect with millions of readers.</h1>
  
    <button className="btn">Start Wirting</button>
       </div>
<img style={{width:"25%"}} src="/assets/images/t.svg" alt="description"/>
       
       
        </div>
<div className="home-info grid" >
<div className="col card">
    <h1> this is something</h1>
    <h2> content realted to that something</h2>
    <h3> Contanct Info</h3>
</div>
<div className="col card">
    <h1> this is something</h1>
    <h2> content realted to that something</h2>
    <h3> Contanct Info</h3>
</div>
<div className="col card">
    <h1> this is something</h1>
    <h2> content realted to that something</h2>
    <h3> Contanct Info</h3>
</div>

</div>
<div ><SignUp/></div>

    </div>
}   
export default Home;