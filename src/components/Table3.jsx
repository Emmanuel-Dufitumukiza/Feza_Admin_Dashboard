import react,{useEffect, useState} from 'react'
import { axiosInstance } from '../../config';

const Table2 = (props)=>{

  useEffect(()=>{
    getCategories()
  },[])

  const [categories,setCategories] = useState([])

  const getCategories = async()=>{
    let res = await axiosInstance.get("/expense/getExpenseCategories");
 
    setCategories(res.data.expenseCategories)

 }

  const getCatName = (cat)=>{
    let all = categories?.filter((c)=>c?._id == cat);
    return all[0]?.categoryName;
   }

   const getP = (p)=>{
     let ind = p.indexOf(".");
   
     if(ind>0){
      let after = p.slice(ind+1, p.length-1);
      let point = 0;
 
      if(after){
         point = after[0];
      }
 
      let all = p.slice(0,ind+1)+""+point+""+p.slice(p.length-1, p.length);
 
      return all;
     }

     return p;
   }

    return(
        <>
        
        <div className="table-responsive table-cont bg-white mb-5">
  <table className="table">
    <thead>

      {/* <tr>
           <th className='emp'></th>
           <th colSpan={"4"} className="text-center hist">
            Historical Period
           </th>
           <th colSpan={"5"} className="text-center fore">
            Forecast Period
           </th>
      </tr> */}
    <tr className='bdd'>
      <th className='emp'></th>
      {
        props?.ranges?.map((r)=>(
          <th className='hist time-rn text-center'>{r}</th>
        ))
      }
      {/* <th className='hist'>2014,jan,7 to 2010 jan 12</th>
      <th className='hist'>2014,jan,7 to 2010 jan 12</th>
      <th className='hist'>2014,jan,7 to 2010 jan 12</th>
      <th className='hist'>2014,jan,7 to 2010 jan 12</th>
      <th className=' hist'>2014,jan,7 to 2010 jan 12</th>
      <th className=' hist'>2014,jan,7 to 2010 jan 12</th>
      <th className=' hist'>2014,jan,7 to 2010 jan 12</th>
      <th className=' hist'>2014,jan,7 to 2010 jan 12</th> */}
    </tr>

    <tr className='text-white'>
        <th scope="col" colSpan={"1000"}><span className='text-white w-100 p-0 no-select'>Balance Sheet</span></th>
      </tr>
      <tr className='cash-title text-white'>
        <th scope="col" colSpan={"10"}><h3 className='text-white w-100 p-0'>Balance Sheet</h3></th>
      </tr>
    </thead>
    <tbody>
      <tr style={{backgroundColor: "skyblue"}}>
        <th colSpan={"1000"} scope="row"><h5>ASSETS</h5></th>
      </tr>

      <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>CURRENT ASSETS</h5></td>
            </tr>

            <tr>
      <td>Cash</td>
      {
        props?.CashAtTheEndofPeriod?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>
      
      <tr>
      <td>Account Recievable (Money that people owe me)</td>
      {
        props?.tableHead12?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>
      
      <tr>
      <td>Inventory</td>
      {
        props?.Inventory?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
      <td>Prepaid Expenses</td>
      {
        props?.PrepaidExpenses?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
      <td>Short-Term Investments</td>
      {
        props?.ShortTermInvestments?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr  style={{backgroundColor: "skyblue"}}>
            <td><h5>TOTAL CURRENT ASSETS</h5></td>
            {
              props?.TOTALCURRENTASSETS?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>FIXED (LONG TERM) ASSETS</h5></td>
            </tr>

            <tr>
                <td>Long-Term Investments</td>
                {
              props?.LongTermInvestments?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Property, Plant, and Equipment</td>
                {
              props?.CashPaidfor?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>(Less Accumulated Depreciation)</td>
                {
              props?.LessAccumulatedDepreciation?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Intangible Assets</td>
                {
              props?.IntangibleAssets?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "skyblue"}}>
            <td><h5>TOTAL FIXED ASSETS</h5></td>
            {
              props?.TOTALFIXEDASSETS?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>OTHER ASSETS</h5></td>
            </tr>

            <tr>
                <td>Deferred Income Tax</td>
                {
              props?.DeferredIncomeTax?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Other</td>
                {
              props?.Other?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "skyblue"}}>
            <td><h5>TOTAL OTHER ASSETS</h5></td>
            {
              props?.TOTALOTHERASSETS?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "limegreen"}}>
            <td><h5>TOTAL ASSETS</h5></td>
            {
              props?.TOTALASSETS?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>CURRENT LIABILITIES</h5></td>
            </tr>

            <tr>
                <td>Accounts Payable</td>
                {
              props?.AccountsPayable?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Short-Term Loans</td>
                {
              props?.ShortTermLoans?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Income Taxes Payable</td>
                {
              props?.IncomeTaxesPayable?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Accrued Salaries and Wages</td>
                {
              props?.tableHead7?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Unearned Revenue</td>
                {
              props?.UnearnedRevenue?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Current Portion of Long-Term Debt</td>
                {
              props?.CurrentPortionofLongTermDebt?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            
            <tr  style={{backgroundColor: "skyblue"}}>
            <td><h5>TOTAL CURRENT LIABILITIES</h5></td>
            {
              props?.TOTALCURRENTLIABILITIES?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>LONG TERM LIABILITIES</h5></td>
            </tr>

            <tr>
                <td>Long-Term Loans</td>
                {
              props?.LongTermLoans?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Deferred Income Tax</td>
                {
              props?.DeferredIncomeTax2?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Other</td>
                {
              props?.Other2?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "skyblue"}}>
            <td ><h5>TOTAL LONG-TERM LIABILITIES</h5></td>
            {
              props?.TOTALLONGTERMLIABILITIES?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "limegreen"}}>
            <td><h5>TOTAL LIABLITIES</h5></td>
            {
              props?.TOTALLIABLITIES?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "lavender"}}>
            <td colSpan={"1000"}><h5>OWNER'S EQUITY</h5></td>
            </tr>

            <tr>
                <td>Owners equity</td>
                {
              props?.OwnerEquity?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
                <td>Retained Earnings (Net Income)</td>
                {
              props?.NetIncome?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>
            <tr>
                <td>Other</td>
                {
              props?.Other3?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "skyblue"}}>
            <td><h5>TOTAL OWNER'S EQUITY</h5></td>
            {
              props?.TOTALOWNEREQUITY?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

            <tr  style={{backgroundColor: "limegreen"}}>
            <td><h5>TOTAL LIABILITIES AND OWNER'S EQUITY</h5></td>
            {
              props?.TOTALLIABILITIESANDOWNEREQUITY?.map((p)=>(
            <td className='fw-bold'>{p}</td>
              ))
            }
            </tr>

</tbody>

  </table>
</div>
        </>
    )
}

export default Table2;