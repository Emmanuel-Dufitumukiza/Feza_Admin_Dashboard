import react, {useEffect, useState} from 'react'
import logo from '../assets/images/logo.png'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dashboard from '@material-ui/icons/Dashboard';

import {
  BrowserRouter,
  Routes,
  Link,unstable_HistoryRouter,useParams,useNavigate
} from "react-router-dom";

const LeftBar = (props)=>{
   const params = useParams()
  const navigate = useNavigate();

  const Logout = ()=>{
      localStorage.removeItem("token");
      return navigate('/')
  }

    return(
     <>
     <div className={`left-bar shadow-lg px-2 ${props?.darkmode}`}>
       <div className="w-100">
       <div className="logo-cont mx-auto text-center p-3 w-75">
            <img src={logo} alt="logo" className='w-100' />
        </div>
        
        <div className="links-cont mt-5"  onClick={()=>navigate('/addsmb')}>
          <div className={`link w-100 p-3 py-2 d-flex ${props?.active == 'smb'? 'active' : ''}`}><span><PeopleAltIcon/></span>&nbsp; SMBs</div>
        </div>
        <div className="links-cont mt-3"  onClick={()=>navigate('/investors')}>
          <div className={`link w-100 p-3 py-2 ${props?.active == 'investors'? 'active' : ''}`}><span><BusinessIcon/></span>&nbsp; Investors</div>
        </div>

{
  props?.dash?
  <button onClick={()=>navigate('/dashboard/'+params?.id)} className="btn btn-default w-100 mt-4 logoutBtn fw-bold shadow-none  mb-5 mt-3 text-start ps-3"><Dashboard/> &nbsp;Dashboard</button>
  :
  <></>
}
        <br/><br/><button onClick={Logout} className={`btn btn-default w-100 mt-5 logoutBtn fw-bold shadow-none ${props?.darkmode? 'lgBtn5': ''}`}><ExitToAppIcon/> &nbsp;Logout</button>

       </div>
     </div>
     </>
    )
}

export default LeftBar;