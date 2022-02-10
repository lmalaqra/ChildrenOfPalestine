import { ReactNode,ReactElement,useState,useEffect, useRef,useContext } from "react";
import "./signup.css"
import axios from "axios";
import Input from ".././input/Input"
import Button from "../button/Button"
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../userContext";

type formData={
email:String,
password:String,
name:String,
gender:String,
birthDate:Date,




}



const SignUp:React.FC=():JSX.Element=>{
    const ref=useRef<any>();
    const {user,setUser}=useContext<any>(userContext);

const navigate=useNavigate();
    const [data, setdata] = useState<formData>({email:"",
        password:"",
       name:"",
        gender:"",
        birthDate:undefined,
        });
    const [divCount, setdivCount] = useState<number>(0);
    const [animate,setAnimate]=useState({
        isLoading:false,
        data:false
    })
    const getText=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{

        const {name,value}=e.target;
        console.log(name,value);
        
        setdata(prev=>{
            return{...prev , [name]:value}
        })
        
            }
            const generateToken=(e:React.MouseEvent<HTMLButtonElement>)=>{
                e.preventDefault();
                if(animate.isLoading)return;
                setAnimate(prev=>{
                    return{...prev,isLoading:true,data:false}
                })
                axios.post('signup', {email:data.email,password:data.password})
                .then(function (response) {
                  setAnimate(prev=>{
                      return{...prev,isLoading:false}
                  });
                  localStorage.setItem("loggedIn","true" );
                  localStorage.setItem("id",JSON.stringify(response.data.user._id));
setUser(()=>{
    return{loggedIn:true,id:response.data.user._id}
});                      
            back(e,1);
                })
                .catch(function (error) {
                  setAnimate({isLoading:false,data:false})
                });
            
            }
        

  
const formHtml:JSX.Element[]=[<div className="register">
<Input value={data.email} inputType="email" name="email" changeHandler={getText}/>
<Input value={data.password} inputType="password" name="password" changeHandler={getText}/>


<button onClick={generateToken} className="btn">&#8594; </button>


</div>,<div className="persoal-info">
    <div style={{marginTop:"20px"}}>
<Input value={data.name} inputType="text" name="name" changeHandler={getText}/>

</div>
<div style={{display:"flex" ,justifyContent:"space-around",
marginTop:"30px",marginBottom:"15px" }}   >
<Input value={data.gender} inputType="select" name="gender" values={["male","female"]} changeHandler={getText}/>
<Input value={data.birthDate} inputType="date" name="birthDate" changeHandler={getText}/>
</div>
<div className="btns">
<button type="submit" onClick={(e)=>{back(e,-1)}} className="btn">&#8592;</button>

<div className="bttn-container">
  

  <button type="submit" onClick={submitData} className={`bttn ${animate.data?"active":""}`} >{animate.isLoading?<Loader/>:animate.data? <svg onAnimationEnd={redirectPage} className="check" viewBox="0 0 512 512" width="20" >
  <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
</svg>:"Sign Up"} 
 </button>
  </div>
</div>
</div>]
function redirectPage(){
setTimeout(()=>{

navigate('/');

},500)

}


function submitData(e:React.MouseEvent<HTMLButtonElement>){
e.preventDefault();
if(animate.isLoading)return;
    setAnimate(prev=>{
        return{...prev,isLoading:true,data:false}
    })
    axios.patch('signup', data)
      .then(function (response) {
        setAnimate(prev=>{
            return{...prev,isLoading:false,data:true}
        });
        console.log(response);
      })
      .catch(function (error) {
        setAnimate({isLoading:false,data:false})
      });


}


function back(e:React.MouseEvent<HTMLButtonElement>,value:number){
    e.preventDefault();

    if(!ref.current)return;
    let isFormValid=ref.current.checkValidity();
    if(!isFormValid){
        ref.current.reportValidity();
    }else{
        setdivCount(divCount+value)}
}


    
   


    return<form ref={ref} >
        <div className="signup">
        <img style={{width:"30%" ,fill:"white",color:"white",marginBottom:"30px"}} src="/assets/images/rageHook.svg" alt="logo"/>


{formHtml[divCount]}


</div>
    </form>
}


export default SignUp;