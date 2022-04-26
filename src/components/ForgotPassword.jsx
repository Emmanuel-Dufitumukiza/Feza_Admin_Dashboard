import react, {useEffect, useState} from 'react'
import bg from '../assets/images/bg.png'
import {
    BrowserRouter,
    Routes,
    Link,unstable_HistoryRouter,useParams,useNavigate
  } from "react-router-dom";
import { axiosInstance } from '../../config';

  const ForgotPassword = ()=>{
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null)
const [emailsent, setEmailsent] = useState(null)
const [clicked, setClicked] = useState(false)
    const Login = ()=>{
        navigate('/addsmb')
    }

    const ResetPass = async(e)=>{
       e.preventDefault();
       setLoginError(null)
       setClicked(true)

try{
    let email = document.getElementById("email").value;
    setEmailsent(email)
    let res = await axiosInstance.post("/auth/resetadminpassword", {email: email});

    if(res.data.message){
        setLoginError(res.data.message)
       setClicked(false)
    }
    if(res.data.messageSuccess){
       setClicked(false)
     document.getElementById("myForms").style.display = "none"
     document.getElementById("emailsentcontainer").style.display = "block"
    }
}
catch(error){
    alert("An error occured, please try again")
}
    }

    return(
        <>
         <div className="login-page">
         <div className="form-cont mx-auto">

<div className="top-box">
    
</div>

<div id="emailsentcontainer" className="email-sent rounded bg-white mx-auto p-4">
    <h6 className='text-center text-success'>We sent Link to you email {emailsent}, please go to your email and click the link to reset your password</h6>
    
   <br/> <div className="btn-cont mb-4 text-center">
<button onClick={()=>navigate("/")} type="button" className='btn shadow-none btn-default fw-bold'>Back To Login</button>
</div>
    </div>

<form id="myForms" method="POST" onSubmit={ResetPass} className="login-form mx-auto shadow-sm">

<div className='header-title'>
<h3 className='fw-bold text-center'>Forgot Password</h3>
<p className='text-center'>Forgot Password. Change!</p>
</div>

<div className="inpt-cont mb-4">
<input type="email" id="email" required className='form-control shadow-none' autoComplete='off' placeholder='Email' />
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
    !clicked?
<div className="btn-cont mb-4 text-center">
<button type="submit" className='btn shadow-none btn-default w-75 fw-bold'>Forgot</button>
</div>
    :
    <div className="btn-cont mb-4 text-center">
<button type="button" className='btn shadow-none btn-default w-75 fw-bold'>Sending email...</button>
</div>
}

<div className="m-2">
<p className='text-center fg'>Remember Password. <a href="#" className='text-dark' onClick={()=>navigate("/")}>Log In?</a></p>
</div> 

</form>
</div>
         </div>
        </>
    )
}

export default ForgotPassword;