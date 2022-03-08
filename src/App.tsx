import { ReactElement, ReactNode,useState,useEffect,useRef } from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate

 
} from "react-router-dom";
import { useNavigate } from "react-router";

  import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import Feed from "./components/newsfeed/Feed";
import SignUp from "./components/signUp/Signup";
import SignPage from "./components/signpage/SignPage";
import useWindowDimensions from "./services/service";
import { userContext } from "./userContext";
import Facebook from "./components/facebook/Facebook";
import HomeMe from "./components/homeMe/Home_Me";
import axios from 'axios';
import Perview from "./components/editor/Perview";
 
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
axios.get('/verify').then(res=>{

setUser({loggedIn:true,
id:res.data.id});
localStorage.setItem('loggedIn',JSON.stringify(true));
localStorage.setItem('id',JSON.stringify(res.data.id));


}).catch(e=>{


  setUser({loggedIn:false,id:''});
  
  localStorage.setItem('loggedIn',JSON.stringify(false));
localStorage.setItem('id',JSON.stringify(''));
})

    

  },[]);
  useEffect(() => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  if(!loggedIn)return;
  setUser(prev=>{return{...prev,loggedIn}})
  }, [])
  
const [navState,setNavState] = useState(false)

const{height}=useWindowDimensions();

  return<>

  <Router >
  <userContext.Provider value={{user:user,setUser:setUser}}>
 <Layout user={user} navState={navState}/>
 <Routes>
  <Route  path="/*" element={user.loggedIn?<HomeMe user={user} />:<Home onChange={(value:boolean)=>{setNavState(prev=>value)}}/>}/>
  <Route  path="/blog" element={<Blog/>}/>
  <Route  path="/feed" element={<Feed/>}/>
  <Route  path="/signup" element={user.loggedIn?<Navigate to="/" />: <SignPage height={height}/>}/>
  <Route path="/api/facebook" element={<Facebook/>}/>


</Routes>
</userContext.Provider>

 </Router>

 
  </>
}

export default App;
