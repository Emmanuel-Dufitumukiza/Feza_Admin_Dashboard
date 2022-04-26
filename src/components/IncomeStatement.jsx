import react,{useEffect,useState} from 'react'
import LeftBar from './LeftBar';
import Table from './Table';
import user from '../assets/images/user.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  BrowserRouter,
  Routes,
  Link,unstable_HistoryRouter,useParams,useNavigate
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosInstance } from '../../config';

const IncomeStatement = ()=>{
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());
  let params = useParams();

  const [rangesTime, setRangesTime] = useState([])
const [from, setFrom]  = useState(null)
const [end, setEnd]  = useState(null)

  const [currentUser, setCurrentUser] = useState({})

    const Logout = ()=>{
        localStorage.removeItem("token");
        return navigate('/')
    }

    useEffect(()=>{
        getInfo();
        getRangedDates(null,null)
    },[])

    useEffect(()=>{ 
    let startDated = onDateChanges(value);

    setFrom(startDated)
    
    },[ value])

    useEffect(()=>{ 
      let endDated = onDateChangeend(value2)
      setEnd(endDated)
      
      },[ value2])

      useEffect(()=>{
      if(from && end){
        getRangedDates(from,end)
      }
      },[from,end])

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

    const getMonth = (mon)=>{
      switch(mon){
        case "Jan": mon = "01"
        break;
        case "Feb": mon = "02"
        break;
        case "Mar": mon = "03"
        break;
        case "Apr": mon = "04"
        break;
        case "May": mon = "05"
        break;
        case "Jun": mon = "06"
        break;
        case "Jul": mon = "07"
        break;
        case "Aug": mon = "08"
        break;
        case "Sep": mon = "09"
        break;
        case "Oct": mon = "10"
        break;
        case "Nov": mon = "11"
        break;
        case "Dec": mon = "12"
        break;
      }
  
      return mon;
    }

    const [ran, setRan] = useState([])

    function getRanges(sy,ey,sm,em,sd,ed){
      // console.log(sy,ey,sm,em,sd,ed)
    const getDaysInMonth = function(month,year) {
        return new Date(year, month, 0).getDate();
     };
    
     const getMont = (mon)=>{
         const months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
         return months[mon];
     }
    
    let ranges = [];
    
    for(let i=sy; i<=ey; i++){
       for(let a=1; a<=12; a++){
           if( i == sy){
           let e = sm-1;
           if((a+e)<=12){
            if((a+e) == em && sy == ey){
              let exd = sd;
               let days = getDaysInMonth((a+e),i);
               if(days<exd){
                exd = days;
               }

               if(exd>ed){
                 exd = ed;
               }

                ranges.push(exd+" "+getMont((a+e)-1) +" "+i);

                if(exd<ed){
                  ranges.push(ed+" "+getMont((a+e)-1) +" "+i);
                }
                break;
            }
    
            let exd = sd;
            let days = getDaysInMonth((a+e),i);
     
            if(days<exd){
             exd = days;
            }
    
               ranges.push(exd+" "+getMont((a+e)-1) + " " +i);
               continue;
           }
    
           continue;
           }
    
           if( i == ey){
                if(a<=em){
                    if(a == em){
    
                        let exd = sd;
                        let days = getDaysInMonth(a,i);
                        if(days<ed){
                         exd = days;
                        }

                        if(exd>ed){
                          exd = ed;
                        }         
    
                        ranges.push(exd+" "+getMont(a-1) + " " +i);
                        
                        if(exd<ed){
                          ranges.push(ed+" "+getMont(a-1) + " " +i);
                      }
                        break;
                    }
    
                    let exd = sd;
                    let days = getDaysInMonth(a,i);
                    if(days<sd){
                     exd = days;
                    }
    
                    ranges.push(exd+" "+getMont(a-1) + " " +i);
                    continue;
                }
                continue;
           }
    
           let exd = sd;
           let days = getDaysInMonth(a,i);
           if(days<sd){
            exd = days;
           }
    
           ranges.push(exd+" "+getMont(a-1) + " " +i);
       }
    }
    setRangesTime(ranges)
    let rn = [];
    let wd = [350];
    let periods = []

    if(ranges.length>1){
      for(let k=0; k<ranges.length; k++){
        if(ranges[k+1]){
          rn.push(ranges[k] + " to " + ranges[k+1]);
          wd.push(200)
          periods.push({start: ranges[k], end: ranges[k+1]});
        }
      }
    }

    if(ranges.length<2){
      rn.push(ranges[0] + " to "+ (ed + " "+ getMont(em-1)) + " "+ ey);
      wd.push(200)
      periods.push({start: ranges[0], end: (ed + " "+ getMont(em-1)) + " "+ ey})
    }

    // setState({
    //   tableHead: rn,
    //   tableHead2: ['Operations Activities', '', '', '', '', '', '', '', ''],
    //   tableHead4: ['Cash Gotten from', '', '', '', '', '', '', '', ''],
    //   tableHead10: ['Depreciation and Amortization', '', '', '', '', '', '', '', ''],
    //   tableHead11: ['Cash Lost', '', '', '', '', '', '', '', ''],
    //   tableHead13: ['Net Cash Flow From Operations', '', '', '', '', '', '', '', ''],
    //   tableHead5: ['Investing Activities', '', '', '', '', '', '', '', ''],
    //   tableHead6: [''],
    //   widthArr: wd
    // })
    console.log(rn)
    setRan(rn)
    return periods;
}

const onDateChanges = (date) =>{
  // setStartCalendarOpen(false);
  // setFrom(date)
  let arrayTime = date.toString().split(" ");
  let startTime = arrayTime[1]+" "+arrayTime[2]+", "+arrayTime[3];
  return startTime;
}

const onDateChangeend = (date) =>{
// setToCalendarOpen(false);
let arrayTime = date.toString().split(" ");
let startTime = arrayTime[1]+" "+arrayTime[2]+", "+arrayTime[3];
return startTime;
}

const getRangedDates = async(startDated,endDated)=>{
  if(!startDated){
    startDated = onDateChanges(new Date())
  }
  if(!endDated){
    endDated = onDateChangeend(new Date())
  }
  // console.log(startDated)
try{
let startingdate = startDated.split(" ");
let endingdate =  endDated.split(" ");

let startMon = getMonth(startingdate[0]);
let endMon = getMonth(endingdate[0]);
let startYear =startingdate[2]
let endYear =endingdate[2]
let len = startingdate[1]?.length;
let mystartDate = startingdate[1]?.slice(0,len-1)
let startingTime = mystartDate;

let len2 = endingdate[1]?.length;
let myendDate = endingdate[1]?.slice(0,len2-1)
let myendDateNum = parseInt(endingdate[1]?.slice(0,len2-1));
let num  =myendDateNum+1;

let periods = getRanges(parseInt(startYear),parseInt(endYear),parseInt(startMon), parseInt(endMon), parseInt(startingTime), parseInt(myendDateNum));
let numberedPeriods = [];

for(let j=0; j<periods.length; j++){
  let startingdate = periods[j].start?.split(" ");
  let endingdate =  periods[j].end?.split(" ");
  
  let sy = startingdate[2];
  let ey = endingdate[2];
  let sd = startingdate[0];
  let ed = endingdate[0];
  ed = parseInt(ed)+1;
  
  if(ed==32){
    ed = 31;
  }
  let sm = getMonth(startingdate[1]);
  let em = getMonth(endingdate[1]);
  
  if(sd<10){
    sd = "0"+sd.toString();
  }
  if(ed<10){
    ed = "0"+ed.toString();
  }
  let startFrom = `${sy}-${sm}-${sd}` + 'T00:00:00.000Z';
  let endTo = `${ey}-${em}-${ed}` + 'T00:00:00.000Z';
  numberedPeriods.push({start: startFrom, end: endTo})
  }
  
  if(num<10){
    myendDate = "0"+num.toString();
  }
  if(num>=10){
    myendDate = num.toString();
  }
  
  let endingTime = myendDate;
  
  if(startYear && endYear && startMon && endMon && startingTime && endingTime){
    let startFrom = `${startYear}-${startMon}-${startingTime}` + 'T00:00:00.000Z';
    let endTo = `${endYear}-${endMon}-${endingTime}` + 'T00:00:00.000Z';
    // console.log(numberedPeriods)
    let userId = params?.id;
    getTotalSales(startFrom,endTo,userId,numberedPeriods);
    getOpsExp(startFrom,endTo,userId,numberedPeriods);
    getNonOpsExp(startFrom,endTo,userId,numberedPeriods);
  }

}
catch(error){
  // alert(error.message)
}
}


const [prices, setPrices] = useState([])
const [prices2, setPrices2] = useState([])
const [selectedSales, setSelectedSales] = useState([])

const getTotalSales = async(startFrom,endTo,userId,numberedPeriods)=>{
   let res =  await axiosInstance.post("/financial/getTotalSales", {
     start: startFrom,
     end: endTo,
user: userId
   });

  let sale = res.data.sales;
  let selectedOne = []

  for(let i=0; i<sale.length; i++){
    if(!selectedOne.includes(sale[i]?.productId)){
      selectedOne.push(sale[i]?.productId)
    }
  }

  setSelectedSales(selectedOne)

  if(selectedOne.length == 0){
    selectedOne = [""];
  }
// console.log(selectedSales)
  let prices = await axiosInstance.post("/financial/getPricesRevenue", {user: userId,products: selectedOne, dates: numberedPeriods})
  setPrices(prices.data)
  let prices2 = await axiosInstance.post("/financial/getPricesCogs", {user: userId,products: selectedOne, dates: numberedPeriods})
  setPrices2(prices2.data)
  // console.log(prices2.data)
  //  setTotalSales(res.data.total)
}

const [selectedExpenses, setSelectedExpenses] = useState([])
const [selectedNonExpenses, setSelectedNonExpenses] = useState([])

const getOpsExp = async(startFrom,endTo,userId,numberedPeriods)=>{
  let res2 =  await axiosInstance.post("/financial/getValueOperatingExpenses", {
    start: startFrom,
    end: endTo,
    user: userId
  });

  let exp = []

  res2.data.expenses?.map((e)=>{
   if(!exp.includes(e?.expenseCategory)){
     exp.push(e?.expenseCategory);
   }
  })

  setSelectedExpenses(exp);

  if(exp.length==0){
    exp = [""];
  }

  await getExpPrices(startFrom,endTo,userId,numberedPeriods,exp);
}

const [prices4, setPrices4] = useState([])
const [prices5, setPrices5] = useState([])

const getExpPrices = async(startFrom,endTo,userId,numberedPeriods,selectedOne)=>{
  let prices = await axiosInstance.post("/financial/getPricesExpenses", {user: userId,products: selectedOne, dates: numberedPeriods})
  setPrices4(prices.data)
}

const getNonOpsExp = async(startFrom,endTo,userId,numberedPeriods)=>{
  let res2 =  await axiosInstance.post("/financial/getValueNonOperatingExpenses", {
    start: startFrom,
    end: endTo,
    user: userId
  });

  let exp = []

  res2.data.expenses?.map((e)=>{
   if(!exp.includes(e?.expenseCategory)){
     exp.push(e?.expenseCategory);
   }
  })

  setSelectedNonExpenses(exp);

  if(exp.length==0){
    exp = [""];
  }

  await getNonExpPrices(startFrom,endTo,userId,numberedPeriods,exp);

}

const getNonExpPrices = async(startFrom,endTo,userId,numberedPeriods,selectedOne)=>{
  let prices = await axiosInstance.post("/financial/getPricesExpenses", {user: userId,products: selectedOne, dates: numberedPeriods})
  setPrices5(prices.data)
}

const totalRevenues = []

let sum3 = 0;
for (let j = 0; j <prices[0]?.length; j ++) {
  sum3 = 0;
  for(let a=0; a<prices.length; a++){
  sum3+=prices[a][j];
  }
  totalRevenues.push("RF " + sum3?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

const totalcogs = []

let sum4 = 0;
for (let j = 0; j <prices2[0]?.length; j ++) {
  sum4 = 0;
  for(let a=0; a<prices2.length; a++){
  sum4+=prices2[a][j];
  }
  totalcogs.push("RF " + sum4?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

const grossProfits = []

let sum5 = 0;

const com = [totalRevenues, totalcogs]

for (let j = 0; j <com[0]?.length; j ++) {
  sum5 = 0;
  for(let a=0; a<com.length; a++){
    let arr = (com[a][j])?.split(" ");
    if(arr?.length>0){
      arr[1] = arr[1]?.split(",")?.join("")
    if(sum5>0){
  sum5-=parseInt(arr[1]);
  continue;
    }
  sum5+=parseInt(arr[1]);
    }
  }
  grossProfits.push("RF " + sum5?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

const totalOpEx = []

let sum6 = 0;
if(prices4?.length>0){
  for (let j = 0; j <prices4[0]?.length; j ++) {
    sum4 = 0;
    for(let a=0; a<prices4.length; a++){
    sum6+=prices4[a][j];
    }
    totalOpEx.push("RF " + sum6?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }
}

const opProfit = []

const com2 = [grossProfits, totalOpEx]
let sum8 = 0;
  for (let j = 0; j <com2[0]?.length; j ++) {
    sum8 = 0;
    for(let a=0; a<com2.length; a++){
      let arr = (com2[a][j])?.split(" ");
      if(arr?.length>0){
        arr[1] = arr[1]?.split(",")?.join("")
      if(sum8>0){
    sum8-=parseInt(arr[1]);
    continue;
      }
    sum8+=parseInt(arr[1]);
      }
    }
    opProfit.push("RF " + sum8?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }

  const totalNonOpEx = [];

  let sums = 0;
  if(prices5?.length>0){
    for (let j = 0; j <prices5[0]?.length; j ++) {
      sums = 0;
      for(let a=0; a<prices5.length; a++){
      sums+=prices5[a][j];
      }
      totalNonOpEx.push("RF " + sums?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }
  }

  const NetIncome = []
  const grossMargins = []
  const opMargins = []
  const NetProfitMargin = []

  const com3 = [opProfit, totalNonOpEx];
  let sumss = 0;
  for (let j = 0; j <com3[0]?.length; j ++) {
    sumss = 0;
    // for(let a=0; a<2; a++){
      let arr = (com3[0][j])?.split(" ");
      let arr2 = (com3[1][j])?.split(" ");

      if(arr?.length>0 && arr2?.length>0){
        arr[1] = arr[1]?.split(",")?.join("")
        arr2[1] = arr2[1]?.split(",")?.join("")

    sumss = parseInt(arr[1]) -  parseInt(arr2[1]);
      }
      // }
      NetIncome.push("RF " + sumss?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }
  
  const com4 = [grossProfits, totalRevenues];
  let sumss2 = 0;

  for (let j = 0; j <com4[0]?.length; j ++) {
    sumss2 = 0;
    let arr = (com4[0][j])?.split(" ");
    let arr2 = (com4[1][j])?.split(" ");
    
    if(arr?.length>0 && arr2?.length>0){
      arr[1] = arr[1]?.split(",")?.join("")
      arr2[1] = arr2[1]?.split(",")?.join("")
  sumss2 = parseFloat(parseFloat(arr[1]) / parseFloat(arr2[1])) * 100;
    }
    grossMargins.push(sumss2?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%");
  }

  const com5 = [opProfit, totalRevenues];
  let sumss3 = 0;

  for (let j = 0; j <com5[0]?.length; j ++) {
    sumss3 = 0;
    let arr = (com5[0][j])?.split(" ");
    let arr2 = (com5[1][j])?.split(" ");
    
    if(arr?.length>0 && arr2?.length>0){
      arr[1] = arr[1]?.split(",")?.join("")
      arr2[1] = arr2[1]?.split(",")?.join("")
  sumss3 = parseFloat(parseFloat(arr[1]) / parseFloat(arr2[1])) * 100;
    }
    opMargins.push(sumss3?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%");
  }

  const com6 = [NetIncome, totalRevenues];
  let sumss4 = 0;

  for (let j = 0; j <com6[0]?.length; j ++) {
    sumss4 = 0;
    let arr = (com6[0][j])?.split(" ");
    let arr2 = (com6[1][j])?.split(" ");
    
    if(arr?.length>0 && arr2?.length>0){
      arr[1] = arr[1]?.split(",")?.join("")
      arr2[1] = arr2[1]?.split(",")?.join("")
  sumss4 = parseFloat(parseFloat(arr[1]) / parseFloat(arr2[1])) * 100;
    }
    // if(!sumss4){
    //   sumss4 = "#DIV/0!"
    // }
    NetProfitMargin.push(sumss4?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%");
  }

  const getName = (name)=>{
    let n = "";
    if(name?.length>13){
      n = name?.slice(0, 13)+"..."
      return n;
    }

    return name;
  }

   return(
        <>
      <div className="smb-page darkmode darkmode2 px-3 pt-3 pb-3">
        <LeftBar darkmode="darkmode" dash={true} />

        <div className="left-conts px-3 pe-2 pb-3">
        <button style={{position: "relative", top: "3px"}} onClick={()=>navigate("/home")} className='btn btn-primary shadow-none backBtn float-start ms-4 me-5'>Back</button>

          <h3 className='text-white text-center mb-4'>Income Statement</h3>

          <div className="right-cont d-flex mt-3">
<div>
<h5 className="fw-bold">{getName(currentUser?.username)}</h5>
<p className="text-muted lit-text pb-1 float-end">Admin</p>
</div>

    <div className="profile ms-3">
        <img src={user} alt="" />
        <span className="activeStatus"></span>
    </div>
</div> 
        <div className="top-hor-nav d-flex mx-auto mb-4 ms-5">
             <div className='me-5'>
             <p className='text-white fr fw-bold text-center'>From</p>
            <button data-bs-toggle="modal" data-bs-target="#fromDateModal" className='btn btn-dark fw-bold' style={{backgroundColor: "black"}}>{from}</button>
             </div>
           <div className='me-5'>
           <p className='text-white to fw-bold text-center'>To</p>
            <button data-bs-toggle="modal" data-bs-target="#toDateModal" className='btn btn-dark fw-bold' style={{backgroundColor: "black"}}>{end}</button>
           </div>
           
           <div className='me-5 ms-5 lbbb'>
           {/* <p className='text-white to fw-bold text-center'>To</p> */}
            <button onClick={()=>navigate('/CashFlow/'+params?.id)} className='btn btn-primary fw-bold shadow-none'>Cashflow Table</button>
           </div>

           <div className='me-5 lbbb'>
           {/* <p className='text-white to fw-bold text-center'>To</p> */}
            <button onClick={()=>navigate('/BalanceSheet/'+params?.id)} className='btn btn-primary fw-bold shadow-none'>Balance Sheet Table</button>
           </div>

          </div>

        <Table opMargins={opMargins} NetProfitMargin={NetProfitMargin} grossMargins={grossMargins} NetIncome={NetIncome} totalNonOpEx={totalNonOpEx} opProfit={opProfit} totalOpEx={totalOpEx} ranges={ran} grossProfits={grossProfits} totalcogs={totalcogs} totalRevenues ={totalRevenues} selectedNonExpenses={selectedNonExpenses} prices5={prices5} prices={prices} prices4={prices4} prices2={prices2} selectedExpenses={selectedExpenses} selectedSales={selectedSales}/>
        <br/>
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
      <Calendar maxDate={new Date()} onChange={onChange} value={value} />
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
      <Calendar maxDate={new Date()} minDate={new Date(from)} onChange={onChange2} value={value2} />
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

export default IncomeStatement;
