import react,{useEffect,useState} from 'react'
import LeftBar from './LeftBar';
import Table from './Table';
import user from '../assets/images/user.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Report from '@material-ui/icons/Report';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import HistoryIcon from '@material-ui/icons/History';
import mon from '../assets/images/mon.png'
import mon2 from '../assets/images/mon2.png'
import { Chart } from "react-google-charts";
import {
  BrowserRouter,
  Routes,
  Link,unstable_HistoryRouter,useParams,useNavigate
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosInstance } from '../../config';

const Dashboard = ()=>{
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({})

    const Logout = ()=>{
        localStorage.removeItem("token");
        return navigate('/')
    }

    let params = useParams();

    useEffect(()=>{
        getInfo();
    },[])

    const getInfo = async()=>{
      try{
        let token = localStorage.getItem("token");
        if(token) {
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
      
        if(userId){
          let res = await axiosInstance.get("/auth/admin/"+userId);
          setCurrentUser(res.data)
          return ;
        }
        localStorage.removeItem("token");
        return navigate('/')
    }

    localStorage.removeItem("token");
    return navigate('/')
      }
      catch(error){
          alert(error.message)
        // localStorage.removeItem("token");
        // return navigate('/')  
      }
    }

  const data = [
    ["Year", "Sales", "Operating Expenses", "Gross Profit","Income Before Taxes"],
    ["2014", 1500, 400, 200,700],
    ["2015", 1170, 460, 250,900],
    ["2016", 660, 1120, 300,1200],
    ["2017", 1030, 540, 350,1500],
  ];
  
  const options = {
    chart: {
      title: "",
      subtitle: "",
    },
  };

  const cashData = [
    [
      "Year",
      "Cash from operations (Annual)",
      "Cash from financing (Annual)",
      "Cash from investing (Annual)",
    ],
    ["2014", 37.8, 80.8, 41.8],
    ["2015", 30.9, 69.5, 32.4],
    ["2016", 25.4, 57, 25.7],
    ["2017", 11.7, 18.8, 10.5],
    ["2018", 11.9, 17.6, 10.4]
  ];
  
   const optionsData = {
    chart: {
      title: "",
      subtitle: "",
    },
  };

  const balanceData = [
    ["City", "Equity", "Liabilities","Assets"],
    ["MRL", 8175000, 8008000,8008000],
    ["RNT", 3792000, 3694000,8008000],
    ["ILY", 2695000, 2896000,8008000],
    ["ABY", 2099000, 1953000,8008000],
    ["JUL", 1526000, 1517000,8008000],
  ];
  
   const optionsBalance = {
    title: "",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "",
      minValue: 0,
    },
    vAxis: {
      title: "",
    },
  };

    return(
        <>
      <div className="smb-page darkmode darkmode2 px-3 pt-3 pb-3">
        <LeftBar darkmode="darkmode" dash={true} />

        <div className="left-conts px-3 pe-2 pb-3">
        <button style={{position: "relative", top: "10px"}} onClick={()=>navigate("/home")} className='btn btn-primary shadow-none backBtn float-start ms-4 me-5'>Back</button>

          {/* <h3 className='text-white text-center mb-4'>Income Statement</h3> */}

          <div className="right-cont d-flex mt-3">
<div>
<h5 className="fw-bold">{currentUser?.username}</h5>
<p className="text-muted lit-text pb-1 float-end">Admin</p>
</div>

    <div className="profile ms-3">
        <img src={user} alt="" />
        <span className="activeStatus"></span>
    </div>
</div> 
<br/><br/>

<div className='boxes-data d-flex mb-5'>
<div className="cont-box-one rounded p-3 mt-5 text-white me-5" style={{position: "relative"}}>
  <p>Sales Growth</p> <h3 className='float-end' style={{position: "relative",top: "-40px"}}>34%</h3>
  <h4 className='float-end' style={{position: "relative",top: "-7px",left: "50px"}}>Monthly</h4>

  <div className="circle-wrap">
  <div className="circle">
    
    <div className="mask full">
      <div className="fill"></div>
    </div>
   
    <div className="mask half">
      <div className="fill"></div>
    </div>
    
    <div className="inside-circle">
     <span style={{position: "relative",top: "-12px"}}>+0.047% <span className='text-success fw-bold arrow'>&#8593;</span></span>
    </div>
    </div>
  </div>

   <h3>1500</h3>
   <p className='ms-2 fw-bold' style={{position: "relative",top: "-8px"}}>This Month</p>

   <div>
     <div className='d-flex'><div className='lmt'><img src={mon} alt="" /></div> <p className='mt-1 ms-2'>Last month</p></div>
     <div className='d-flex'><div className='lmt'><img src={mon2} alt="" /></div> <p className='mt-1 ms-2'>This Month</p></div>
   </div>

  </div>

<div className="cont-box-one rounded p-3 mt-5 text-white">
  <p>Resources</p>

<div>
<div className="btn-def shadow-none text-white">
  <div className='d-flex' style={{position: "relative",top: "13px"}}>
  <p className='d-flex' style={{marginRight: "150px"}}>
  <Report/>
  <p className='ms-2'>Get Report</p>
  </p>

  <p className='chv'><ChevronRightIcon/></p>
  </div>
  </div>
</div>
<div>
<div className="btn-def shadow-none text-white">
  <div className='d-flex' style={{position: "relative",top: "13px"}}>
  <p className='d-flex' style={{marginRight: "150px"}}>
  <HistoryIcon/>
  <p className='ms-2'>Data Access History</p>
  </p>

  <p className='chv'><ChevronRightIcon/></p>
  </div>
  </div>
</div>

<div>
<div className="btn-def2 shadow-none text-white">
  <div className='d-flex' style={{position: "relative",top: "13px"}}>
  <p className='d-flex' style={{marginRight: "150px"}}>
  <SpeakerNotesIcon/>
  <p className='ms-2'>Comment</p>
  </p>

  <p className='chv'><ChevronRightIcon/></p>
  </div>
  </div>
</div>

  </div>
  </div>

  <div className="top-hor-nav d-flex mx-auto mb-5">

              <h4 className='text-white me-5 mt-5'>Financial Statement</h4>

             <div className='me-5 ms-5'>
             <p className='text-white fr fw-bold text-center'>From</p>
            <button data-bs-toggle="modal" data-bs-target="#fromDateModal" className='btn btn-dark fw-bold' style={{backgroundColor: "black"}}>Jan 25, 2014</button>
             </div>
           <div className='me-5'>
           <p className='text-white to fw-bold text-center'>To</p>
            <button data-bs-toggle="modal" data-bs-target="#toDateModal" className='btn btn-dark fw-bold' style={{backgroundColor: "black"}}>Dec 25, 2022</button>
           </div>
          </div>

          <div className="charts-cont">

            <div className="income-chart rounded cont-box-one cont-box-one2 p-4">
            <div className='d-flex mb-3' style={{position: "relative"}}><div className='lmt'><img src={mon} alt="" /></div> <h5 className='mt-1 ms-2 me-5'>Income Statement</h5>
            <button  onClick={()=>navigate('/incomestatement/'+params?.id)} className='btn btn-primary shadow-none' style={{position: 'absolute',right: 0}}>View Table</button>
            </div>

             <div className="cash-info d-flex mb-3">
                <div className='me-5'>
                  <p>Revenue</p>
                  <h4>RF15.80M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Ope. Expense</p>
                  <h4>RF7.30M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Tax</p>
                  <h4>11%</h4>
                </div>


                <div className='ms-5'>
                  <p>Net Profit</p>
                  <h4 style={{color: "crimson"}}>-RF11.3M</h4>
                </div>

               </div>

            <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
              </div>

              {/* cash flow chart */}

              <div className="income-chart mt-5 rounded cont-box-one cont-box-one2 p-4">
            <div className='d-flex mb-3' style={{position: "relative"}}><div className='lmt'><img src={mon2} alt="" /></div> <h5 className='mt-1 ms-2 me-5'>CashFlow </h5>
            <button onClick={()=>navigate('/CashFlow/'+params?.id)} className='btn btn-primary shadow-none' style={{position: 'absolute',right: 0}}>View Table</button>
            </div>

             <div className="cash-info d-flex mb-3">
                <div className='me-5'>
                  <p>Net Cash</p>
                  <h4>RF15.80M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Ope. Cashflow</p>
                  <h4 style={{color: "crimson"}}>-RF7.30M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Inv. Cashflow</p>
                  <h4>RF7.30M</h4>
                </div>


                <div className='ms-5'>
                  <p>Fin. Cashflow</p>
                  <h4>RF7.30M</h4>
                </div>

               </div>

               <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={cashData}
      options={optionsData}
    />
              </div>

              {/* balance sheet chart */}

              <div className="income-chart mt-5 rounded cont-box-one cont-box-one2 p-4">
            <div className='d-flex mb-3' style={{position: "relative"}}><div className='lmt'><img src={mon} alt="" /></div> <h5 className='mt-1 ms-2 me-5'>Balance Sheet </h5>
            <button onClick={()=>navigate('/BalanceSheet/'+params?.id)} className='btn btn-primary shadow-none' style={{position: 'absolute',right: 0}}>View Table</button>
            </div>

             <div className="cash-info d-flex mb-3">
                <div className='me-5'>
                  <p>Assets</p>
                  <h4>RF15.80M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Liablities</p>
                  <h4 style={{color: "crimson"}}>-RF7.30M</h4>
                </div>

                <div className='ms-5 me-5'>
                  <p>Value</p>
                  <h4>11%</h4>
                </div>


                <div className='ms-5'>
                  <p>Debts</p>
                  <h4 style={{color: "crimson"}}>-RF11.3M</h4>
                </div>

               </div>

               <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={balanceData}
      options={optionsBalance}
    />
              </div><br/><br/>
          </div>

  </div>
</div>

<div className="modal fade" id="fromDateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Choose Starting Date</h5>
        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
      <Calendar onChange={onChange} value={value} />
    </div>
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary shadow-none" data-bs-dismiss="modal">Go</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="toDateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Choose Ending Date</h5>
        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
      <Calendar onChange={onChange} value={value} />
    </div>
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary shadow-none" data-bs-dismiss="modal">Go</button>
      </div>
    </div>
  </div>
</div>



        </>
    )
}

export default Dashboard;
