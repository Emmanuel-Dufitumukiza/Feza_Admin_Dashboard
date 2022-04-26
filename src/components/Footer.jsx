import react from 'react';
import {
    BrowserRouter,
    Routes,
    Link,unstable_HistoryRouter,useParams,useNavigate
  } from "react-router-dom";

const Footer = ()=>{

    const navigate = useNavigate();

    const Logout = ()=>{
      localStorage.removeItem("token");
      return navigate('/')
    }

    return (
        <>
        <div className="footer bg-dark w-100 py-4 px-5" style={{marginTop: "200px"}}>
               <div className="d-flex">
                 <p className='text-white mx-auto mt-2'>© 2022 finance360. All rights reserved</p>

                 <div className='d-flex f-link mt-2'>
                    <p className='text-white' onClick={Logout}>Logout</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p className='text-white'>Terms and Conditions</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p className='text-white'> Privacy policy</p> 
                 </div>
               </div>
          </div>
        </>
    )
}

export default Footer;