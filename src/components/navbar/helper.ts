import {useState,useEffect} from "react";



export function useScroll ():Array<boolean | number>{



const [isScroll, setisScroll] = useState<boolean>();
const [scroll, setscroll] = useState<number>(0)

useEffect(() => {
    window.addEventListener('scroll',(e):void=>{
        setscroll(window.scrollY);

if(window.scrollY==0){

    setisScroll(false);
}else{
    setisScroll(true);
}


    });
    return () => {
        window.removeEventListener("scroll",()=>{
            console.log("scroll event has benn removed");
        });
    }
}, []);



return [scroll,isScroll];


}