import { ReactElement, ReactNode,useState,useEffect,useRef } from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

  import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import Feed from "./components/newsfeed/Feed";
import SignUp from "./components/signUp/Signup";
import SignPage from "./components/signpage/SignPage";
import useWindowDimensions from "./services/service";
import { userContext } from "./userContext";
import Facebook from "./components/facebook/Facebook";
 
type user={
  loggedIn:boolean,
  id:String
}

const App:React.FC=():ReactElement=> {
  const [user,setUser]=useState<user>({
    loggedIn:false,
    id:""
  })
  useEffect(()=>{
    const log=JSON.parse(localStorage.getItem('loggedIn'));
    const userId=JSON.parse(localStorage.getItem('id'));
console.log(user);

    if(!log || !userId)return;
    setUser(prev=>{
      return{...prev,loggedIn:log,id:userId}
    })
    

  },[])
const [navState,setNavState] = useState(false)

const{height}=useWindowDimensions();

  return<>

  <Router>
  <userContext.Provider value={{user:user,setUser:setUser}}>
 <Layout user={user} navState={navState}/>
 <Routes>
  <Route  path="/" element={<Home onChange={(value:boolean)=>{setNavState(prev=>value)}}/>}/>
  <Route  path="/blog" element={<Blog/>}/>
  <Route  path="/feed" element={<Feed/>}/>
  <Route  path="/signup" element={<SignPage height={height}/>}/>
  <Route path="/api/facebook" element={<Facebook/>}/>


</Routes>
</userContext.Provider>

 </Router>

 
  </>
}

export default App;
