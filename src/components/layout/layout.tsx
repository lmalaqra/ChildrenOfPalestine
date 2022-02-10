import { ReactElement, ReactNode,useState,useEffect,useRef } from "react";
import {getInputSelection,setCaretPosition} from "./helper";
import NavBar from "../navbar/Navbar"

type Props={
title ?: String,
navState:boolean,
children ?:any,
user:{loggedIn:boolean,id:String}



}



 const Layout:React.FC<Props>=({title,navState,children,user}):ReactElement =>{ 


    return <div style={{margin:"0"}}>
    <NavBar user={user} navState={navState}/>
    </div>




    }



export default Layout;