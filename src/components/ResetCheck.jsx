import react, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config';
import {
    BrowserRouter,
    Routes,
    Link,unstable_HistoryRouter,useNavigate
  } from "react-router-dom";

const ResetCheck = ()=>{
    const navigate = useNavigate();
    const params = useParams();

    useEffect(async()=>{
try{
    let link = params?.link;
    let id = params?.id;
   
     let res = await axiosInstance.post("/auth/checklink", {link: link,id: id});
   
     if(res.data.message == true){
         document.getElementById("login-page").style.display="block"
     }else{
        return navigate("/pagenotfound")
     }
}
catch(error){
    return navigate("/pagenotfound")
}
},[])

const [loginError, setLoginError] = useState(null)
const [error, setError] = useState(false)
const [clicked, setClicked] = useState(false)

useEffect(()=>{
 let token = localStorage.getItem("token");
 
 if(token && token?.length>0){
     return navigate("/check");
 }
},[])

const NewPass = async(e)=>{
        e.preventDefault();

         setLoginError(null)
         setClicked(true);

         let password = document.getElementById("pass").value;
         let password2 = document.getElementById("pass2").value;

         if(password !=  password2){
         setClicked(false);
           return setLoginError("Passwords Don't Match")
         }else{
            try{

                 if(!params?.link || !params?.id){
                    return window.location.reload();
                 }

                let res = await axiosInstance.post("/auth/changeadminpass", {newpass: password,link: params?.link, id: params?.id})
            
                if(res.data.message == true){
                    setLoginError(null)
                    localStorage.setItem("token",res.data.token)
                    setClicked(false);
                    localStorage.removeItem("token")
                    return navigate("/check");
                }
                if(res.data.message == false){
                    setLoginError(null)
                    setClicked(false);
                   return window.location.reload();
                }
            }
            catch(error){
                setClicked(false)
                return window.location.reload();
            }
         }
}

    return(
    <>
       <div className="login-page resetpage" id="login-page">
         <div className="form-cont mx-auto">

<div className="top-box">
    
</div>

<form method="POST" onSubmit={NewPass} className="login-form mx-auto shadow-sm">

<div className='header-title'>
<h3 className='fw-bold text-center'>Reset Password</h3>
<p className='text-center'>Enter New Password To Login</p>
</div>

<div className="inpt-cont mb-4">
<input required type="password" id="pass" className='form-control shadow-none' placeholder='Password' />
</div>

<div className="inpt-cont mb-4">
<input required type="password" id="pass2" className='form-control shadow-none' placeholder='Confirm Password' />
</div>

{
    loginError?
    <div className='mb-4'>
    <p className='text-danger text-center fw-bold'>{loginError}</p>
</div>
:
<></>
}

{
    clicked?
    <div className="btn-cont mb-4 text-center">
    <button type="button" className='btn shadow-none btn-default w-75 fw-bold'> <span className='spinner spinner-border spinner-border-sm'></span> Reseting Password...</button>
    </div>
:
<div className="btn-cont mb-4 text-center">
<button type="submit" className='btn shadow-none btn-default w-75 fw-bold'>Reset Password</button>
</div>
}

<div className="m-2">
<p className='text-center fg'><a href="#" className='text-dark' onClick={()=>navigate("/")}>Back to login?</a></p>
</div> 

</form>
</div>
         </div>
    </>
    )
}

export default ResetCheck;