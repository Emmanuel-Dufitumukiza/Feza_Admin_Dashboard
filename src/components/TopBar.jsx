import react, {useEffect, useState} from 'react'
import user from '../assets/images/user.png'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { axiosInstance } from '../../config';
import jwt_decode from "jwt-decode";
import {
  BrowserRouter,
  Routes,
  Link,unstable_HistoryRouter,useParams,useNavigate
} from "react-router-dom";

const TopBar = (props)=>{
  const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({})

    useEffect(async()=>{
        let token = localStorage.getItem("token")
        if(token) {
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
        if(userId){
          axiosInstance.get("/auth/admin/"+userId)
        .then((res)=>{
            setCurrentUser(res.data)
        })
        .catch((error)=>{
          return navigate("/check");
        })
        }else{
          return navigate("/check");
        }
    }else{
    return navigate("/check");
    }
    },[])

    return(
     <>
     <div className="top-bar shadow-sm px-3 shadow-none">
        <div>
        <h4 className="fw-bold">{props?.title}</h4>
        <p className="text-muted lit-text pb-1">Statistics</p>
        </div>

<div className="right-cont d-flex">
<div>
<h5 className="fw-bold">{currentUser?.username}</h5>
<p className="text-muted lit-text pb-1 float-end">Admin</p>
</div>

    <div className="profile ms-3">
        <img className='w-100 h-100' src={"https://th.bing.com/th/id/R.d72a122fe58ed185399902913ae76fb3?rik=CFSfdBultsty9g&pid=ImgRaw&r=0"} alt="" />
        <span className="activeStatus"></span>
    </div>
</div>

     </div>
     </>
    )
}

export default TopBar;