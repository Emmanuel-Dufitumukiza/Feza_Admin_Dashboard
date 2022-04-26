import react, {useEffect, useState} from 'react'
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import box from '../assets/images/box.png'
import box2 from '../assets/images/box2.png'
import Add from '@material-ui/icons/Add';
import Email from '@material-ui/icons/Email';
import EnhancedTable from './EnhancedTable';
import Footer from './Footer';
import React, { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {
  BrowserRouter,
  Routes,
  Link,unstable_HistoryRouter,useParams,useNavigate
} from "react-router-dom";
import InvestorsTable from './InvestorsTable';
import { axiosInstance } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import jwt_decode from "jwt-decode";
  import {getNames,getCodes} from 'country-list'

const Investors = ()=>{
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const [investors, setAllInvestors] = useState([]);
  const [noInvestors, setNoInvestors] = useState(false);
  const [country, setCountry] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [errors, setErrors]= useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const allCountriesWorld = [];
  const allCodes = [];

   getNames().map((e)=>{
    allCountriesWorld.push(e);
  })
  getCodes().map((c)=>{
   allCodes.push(c)
  })

  const getName = (code)=>{

    if(allCountriesWorld.indexOf(code)>=0){
      return code;
    }

    let index =allCodes.indexOf(code);

    return allCountriesWorld[index];
  }

  useEffect(async()=>{
      let token = localStorage.getItem("token");
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

  const dangernotify = () => toast.error("Please Complete All fields",{
    autoClose: 3000,
    theme: "colored"
    });

    const successnotify = () => toast.success("Investor Added Successfully!",{
      autoClose: 3000,
      theme: "colored"
      });

      const successnotify2 = () => toast.success("Investor deleted Successfully!",{
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });

  const changeHandler = value => {
    setValue(value)
    setCountry(value.label)
  }

  useEffect(()=>{
    getInvestors()
  })

  const [allCountries, setCountries] = useState(null)
  const [invMon, setInvMon] = useState(null)

  const getInvestors =  async()=>{
    try{
      let res= await axiosInstance.get("/auth/allInvestors/20222finance360appapiadmin");

      setAllInvestors(res.data)
      let countries = [];
      let total = 0;

      for(let i=0; i<res.data?.length; i++){
       let c = getName(res.data[i]?.country);

       let y = new Date(res.data[i]?.createdAt)?.getFullYear();
      let mon = new Date(res.data[i]?.createdAt)?.getMonth();
      if(y == new Date().getFullYear() && mon == new Date().getMonth()){
        total++;
      }
       
       if(!countries?.includes(c)){
        countries.push(c);
       }
      }

      setInvMon(total);
      setCountries(countries?.length);

    }
    catch(error){
      return getInvestors();
    }
  }

  const addInvestor = async(e)=>{
   e.preventDefault();

try{
  setClicked(true)
   
  let email = document.getElementById("emails").value?.trim();
  let fullname = document.getElementById("fullname").value?.trim();
  let password = document.getElementById("passwords").value;
  let bname = document.getElementById("bname").value?.trim();
  let website = document.getElementById("website").value?.trim();
  let badd = document.getElementById("badd").value?.trim();
  let cat = document.getElementById("investorCategory").value?.trim();

  if(country?.length>0 &&cat?.length>0 && email.length>0 && fullname.length>0 && password?.length>0 && bname?.length>0 && website?.length>0 && badd?.length>0){
    setErrors(false)
    
    let data = {
      user: {email: email,
     fullname: fullname,
     country: country,
     investorCategory: cat,
     password: password,
     business_name: bname,
     website: website,
     business_address: badd
   }}

   let res = await axiosInstance.post("/auth/registerInvestor",data);
   setClicked(false)

   if(res.data.message?.length>0){
    setEmailError(res.data.message)
    return ;
   }else{
    // getBusinesses();
document.getElementById("emails").value=""
    document.getElementById("fullname").value=""
    document.getElementById("passwords").value=""
document.getElementById("bname").value=""
document.getElementById("website").value=""
document.getElementById("badd").value = ""
document.getElementById("investorCategory").value = ""
setCountry(null)
setTimeout(()=>{
document.getElementById("closeInvCreate").click()
},2000)
    if(document.getElementById("successBtn")){
      return document.getElementById("successBtn").click();
    }
   }

   setClicked(false);
  }else{
    setClicked(false)
    setErrors(true)
    if(document.getElementById("showError"))
    document.getElementById("showError").click()
  }

}
catch(error){
  setClicked(false)
  alert("An error occured, please try again")
}
  }

  const [investorInfo, setInvestorInfo] = useState({})
  const [notPass, setNotPass] = useState(null)

  const getInvestor = (user)=>{
    setInvestorInfo(user)
  }

const deleteInvestor = async(e)=>{
  e.preventDefault()
  let pass = document.getElementById("myPass").value;
  setNotPass(null);
  setClicked(true)

  let res = await axiosInstance.post("/auth/deleteinvestor", {dbPass: currentUser?.password,password: pass,investor: investorInfo?._id})
  setClicked(false)

  if(res.data.error){
   setNotPass(res.data.error)
  }else{
   setNotPass(null);
   document.getElementById("successBtn2").click();
   getInvestors()
   document.getElementById("myPass").value = "";

   setTimeout(()=>{
   document.getElementById("closeDele").click();
   },3000)
  }
}

const [clicked2, setClicked2] = useState(false)

const login = async(email)=>{
  setClicked2(true)
  let res = await axiosInstance.post("/auth/AdminLoginInvestor", {email: email})
  setClicked2(false)
  if(res.data.token){
    return window.open("https://finance360-investors-web.vercel.app/home2?id="+res.data.token);
  }
}

    return(
     <>
      <div className="smb-page px-3 pt-3 pb-3">
        <LeftBar active={"investors"}></LeftBar>
        
        <div className="left-conts px-3 pe-2 pb-3">
         <TopBar  title={"Investors"}></TopBar>

         <div className="boxes-cont w-100 d-flex mt-3">
           <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm me-3">
             <div className='mt-3 me-3'>
             <h5 className='fw-bold'>+{invMon}&nbsp;Investors</h5>
             <p className="text-muted">this Month</p>
             </div>
             <div className="img-cont">
               <img src={box} alt="" />
             </div>
           </div>

           <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm me-3">
             <div className='mt-3 me-3'>
             <h5 className='fw-bold'>{allCountries} Countries</h5>
             <p className="text-muted">Locations</p>
             </div>
             <div className="img-cont">
               <img src={box} alt="" />
             </div>
           </div>

           <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm">
             <div className='mt-3 me-3'>
             <h5 className='fw-bold'>{investors?.length}&nbsp;Total&nbsp;Investors</h5>
             <p className="text-muted">In Total</p>
             </div>
             <div className="img-cont">
               <img src={box2} alt="" />
             </div>
           </div>

         </div>

        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-default logoutBtn fw-bold shadow-none float-end mb-5 mt-3"><Add/> &nbsp;Addd Investor</button>
          <div className='all-cont mt-5 w-100'>
            <span className='alltext fw-bold px-4'>All</span>
          </div>

          {
            investors?.length >0?
            <div className="table-cont border rounded mt-4 mb-5 shadow-sm">
            <InvestorsTable getInvestor={getInvestor} investors={investors}></InvestorsTable>

          </div>
            :
            <>
  <br/><br/><br/><br/><h5 className='text-center my-5 fw-bold'>No Investors Available</h5>
            </>
          }

          <Footer/>
        </div>
      </div>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fw-bold" id="exampleModalLabel">Register Investor</h5>
        <button type="button" id="closeInvCreate" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form method="POST" onSubmit={addInvestor} className="modal-body">
            <div>
        <button id="showError" style={{display: "none"}} type="button" onClick={dangernotify}>Notify!</button>
        <ToastContainer autoClose={3000} />
      </div>
      <div>
        <button id="successBtn" style={{display: "none"}} type="button" onClick={successnotify}>Notify!</button>
        <ToastContainer autoClose={3000} />
      </div>
<div className="d-flex w-100 px-3">
<div className="personal-detail-form w-50 h-100 px-3 pe-5">
<h5 className='text-center mb-4'>Personal Detail</h5>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-user"></i>
           <input required  name="email" type="text" id="fullname" className="form-control shadow-none w-100 border-0" placeholder="Full Name"/>
         </div>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-envelope"></i>
           <input required  name="email" type="email" id="emails" className="form-control shadow-none w-100 border-0" placeholder="Email address"/>
         </div>

         <div className="inp-cont2 w-100 ps-0 mb-2">
         <Select options={options} placeholder="Select country" className="select-input" value={value}  onChange={changeHandler} />
           </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-lock"></i>
           <input required  name="email" type="password" id="passwords" className="form-control shadow-none w-100 border-0" placeholder="Password"/>
         </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-user-graduate"></i>
            <select name="" id="investorCategory" className='form-select shadow-none'>
              <option value="">Investor category</option>
              <option value="1">Microfinance Firm</option>
              {/* <option value="2">Job Position</option>
              <option value="3">Job Position</option> */}
            </select>
         </div>
                            
</div>

<div className="business-detail-form w-50 mb-5 px-3 ps-5 h-100">
<h5 className='text-center mb-4'>Business Details</h5>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-briefcase"></i>
           <input required  name="email" id="bname" type="text" className="form-control shadow-none w-100 border-0" placeholder="Business Name"/>
         </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-address-card"></i>
           <input required  name="email" id="badd" type="text" className="form-control shadow-none w-100 border-0" placeholder="Business Address"/>
         </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-globe"></i>
           <input required  name="email" type="text" id="website" className="form-control shadow-none w-100 border-0" placeholder="Website"/>
         </div>

{/* <button type="submit" className='btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3'>Sign up</button> */}
{
  clicked?
<button type="button" className='btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3'><span className='spinner spinner-border spinner-border-sm'></span> Sign up..</button>
  :
<button type="submit" className='btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3'>Sign up</button>
}
</div>
</div>

      </form>
    </div>
  </div>
</div>

{/* view more for investors */}

<div className="modal fade" id="viewMoreInvestors" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fw-bold" id="exampleModalLabel">Investor Account Detail</h5>
        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <p className='text-muted text-center my-3 fw-bold' style={{fontSize: "18px"}}>Investor ID: {investorInfo?.investorId }</p>
<div className="d-flex w-100 px-3">
<div className="personal-detail-form w-50 h-100 px-3 pe-5">
<h5 className='text-center mb-4'>Personal Detail</h5>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-user"></i>
           <input required value={investorInfo?.fullname}  name="email" type="text" maxLength={"50"} className="form-control shadow-none w-100 border-0" placeholder="Full Name"/>
         </div>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-envelope"></i>
           <input required value={investorInfo?.email}  name="email" type="email" maxLength={"80"} className="form-control shadow-none w-100 border-0" placeholder="Email address"/>
         </div>

         <div className="inp-cont2 w-100 ps-0 mb-2">
         <Select options={options} defaultInputValue= {investorInfo?.country} placeholder="Select country" className="select-input" value={value}  onChange={changeHandler} />
           </div>

         {/* <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-lock"></i>
           <input required defaultValue={"bene123098"}  name="email" type="password" maxLength={"25"} className="form-control shadow-none w-100 border-0" placeholder="Password"/>
         </div> */}

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-user-graduate"></i>
            <select required name="" id="" className='form-select shadow-none'>
              <option disabled>Investor category</option>
              <option value="" selected>Microfinance Firm</option>
            </select>
         </div>

</div>

<div className="business-detail-form w-50 mb-5 px-3 ps-5 h-100">
<h5 className='text-center mb-4'>Business Details</h5>

<div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-briefcase"></i>
           <input required value={investorInfo?.business_name} name="email" type="text" maxLength={"70"} className="form-control shadow-none w-100 border-0" placeholder="Business Name"/>
         </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-address-card"></i>
           <input value={investorInfo?.business_address} required  name="email" type="text" maxLength={"80"} className="form-control shadow-none w-100 border-0" placeholder="Business Address"/>
         </div>

         <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-globe"></i>
           <input value={investorInfo?.website} required  name="email" type="text" maxLength={"100"} className="form-control shadow-none w-100 border-0" placeholder="Website"/>
         </div>

         <button data-bs-toggle="modal" data-bs-target="#deleteInvestorDelModal" data-bs-dismiss="modal" className='btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3 delUser'>Delete User</button>
         <button onClick={()=>login(investorInfo?.email)} className='btn shadow-none btn-default float-end me-5 fw-bold logoutBtn mt-3 loginTo'>
           {
             clicked2?
             <span className='spinner spinner-border spinner-border-sm me-2'></span>
             :
             <></>
           }

           Login to Account</button>

</div>
</div>

      </div>
    </div>
  </div>
</div>

{/* delete investor modal */}

<div className="modal fade" id="deleteInvestorDelModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
  <div>
        <button id="successBtn2" style={{display: "none"}} type="button" onClick={successnotify2}>Notify!</button>
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </div>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{investorInfo?.fullname}</h5>
        <button id="closeDele" type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form method="POST" onSubmit={deleteInvestor} className="modal-body">
        <p className='mb-3 fw-bold'>Are you sure, you want to delete this investor? </p>
        <label htmlFor="myPass"><span className='text-muted  mb-4'>Enter Your Password To Delete This Investor</span></label>
        <br/><div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-lock"></i>
           <input required maxLength={"25"} name="email" id="myPass" type="password" className="form-control shadow-none w-100 border-0" placeholder="Password"/>
         </div>
         {
           notPass?
           <p className='text-danger alert-danger text-center p-2 fw-bold rounded'>{notPass}</p>
           :
           <></>
         }
        <button type="submit" className="btn btn-danger shadow-none mt-3 float-end">
          {
            clicked?
            <span className='spinner spinner-border spinner-border-sm me-2'></span>
            :
            <></>
          }
          Delete Investor</button>
      </form>
      {/* <div className="modal-footer"> */}
        {/* <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button> */}
      {/* </div> */}
    </div>
  </div>
</div>

     </>
    )
}

export default Investors;
