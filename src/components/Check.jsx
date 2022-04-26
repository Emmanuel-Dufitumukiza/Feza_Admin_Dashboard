import react,{useEffect,useState} from 'react'
import { axiosInstance } from '../../config'
import pump from '../assets/images/pump.png'
import {
    BrowserRouter,
    Routes,
    Link,unstable_HistoryRouter,useParams,useNavigate
  } from "react-router-dom";

const Check = ()=>{
      const navigate = useNavigate();
    
    useEffect(async()=>{
        checkAuth()
   },[])

   const checkAuth = async()=>{
    let token = localStorage.getItem("token");

    if(!token){
        return navigate("/");
    }

    try{
        let res = await axiosInstance.get("/auth/checkAuth", {
            headers: {"Authorization": `Bearer ${token}`}
        })
    
        if(res.data.loggedIn == true){
            return navigate("/addsmb");
        }else{
            localStorage.removeItem("token")
            return navigate("/");
        }
    }
    catch(error){
       return checkAuth();
    }
   }

    return(
        <>
        <div className="checkpage ">
           <div>
           <div className="logo-c-cont">
               <img src={pump} alt="logo"  className='w-100 h-100' />
               </div>

               <div class="lds-dual-ring ms-5 mt-5"></div>
           </div>
        </div>
        </>
    )
}

export default Check;