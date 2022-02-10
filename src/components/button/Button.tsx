import { ReactNode,ReactElement,useState,useRef,useEffect } from "react"
import axios from "axios";
import { Rings } from  'react-loader-spinner'

import "./button.css"
import Loader from "../loader/Loader";


const Button:React.FC<any>=({animate,onSubmit}):JSX.Element=>{
  const count=useRef(0);
  const [classes,setClasees]=useState({
    active:false,
    end:false,
    ended:false
  });
  function animationEnded():void {
    count.current++;
   
    if (count.current == 2) {
      setClasees(prev=>{
        return{...prev,end:true}
      });
      const animationTime = setTimeout(() => {
      setClasees(prev=>{
        return{...prev,end:true,ended:true}
      })
      }, 500);
    }
  }

const doAnimation=(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();

if(animate.isLoading)return;
  
onSubmit();


}


return( <div style={{position:"relative"}}>    </div>
  
);

}

export default Button;