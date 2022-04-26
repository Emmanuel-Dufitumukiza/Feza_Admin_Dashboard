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
        <th scope="col" colSpan={"1000"}><span className='text-white w-100 p-0 no-select'>Cash-Flow Statement</span></th>
      </tr>
      <tr className='cash-title text-white'>
        <th scope="col" colSpan={"10"}><h3 className='text-white w-100 p-0'>Cash-Flow Statement</h3></th>
      </tr>
    </thead>
    <tbody>
      <tr style={{backgroundColor: "skyblue"}}>
        <th colSpan={"1000"} scope="row"><h5>Operations Activities</h5></th>
      </tr>

      <tr  style={{backgroundColor: "lavender"}}>
            <td><h5>Cash Gotten from</h5></td>
            {
              props?.cashGotten?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
      <td>Customers (Net Income)</td>
      {
        props?.NetIncome?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>
      
      <tr>
      <td>Account Payable (Money I owe suppliers)</td>
      {
        props?.tableHead6?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>
      
      <tr>
      <td>Account Payable (Money I owe Employees)</td>
      {
        props?.tableHead7?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
      <td>Account Payable (Money I owe Customers)</td>
      {
        props?.tableHead8?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
      <td>Account Payable (Other Money I owe)</td>
      {
        props?.tableHead9?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr  style={{backgroundColor: "lavender"}}>
            <td><h5>Cash Lost</h5></td>
            {
              props?.CashLost?.map((p)=>(
            <td>{p}</td>
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

<tr style={{backgroundColor: "limegreen"}}>
        <th scope="row"><h5>Net Cash Flow From Operations		</h5></th>
        {
        props?.opC?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr style={{backgroundColor: "lavender"}}>
        <th colSpan={"1000"} scope="row"><h5>Investing Activities	</h5></th>
      </tr>

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Cash Receipts from</h5></th>
        {
        props?.CashReceiptsfrom?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Loan Repayment</td>
        {
        props?.LoanRepayment?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Cash Paid for	</h5></th>
        {
        props?.CashPaidfor?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Purchase of Equipment</td>
        {
        props?.PurchaseofEquipment?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Purchase of Property (Warehouse/Land/ Factory)</td>
        {
        props?.PurchaseofProperty?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Purchase of Business</td>
        {
        props?.PurchaseofBusiness?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "limegreen"}}>
        <th scope="row"><h5>Net Cash Flow from Investing Activities		</h5></th>
        {
        props?.NetCashFlowfromInvestingActivities?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr style={{backgroundColor: "lavender"}}>
        <th colSpan={"1000"} scope="row"><h5>Financing Activities	</h5></th>
      </tr>

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Cash Receipts from</h5></th>
        {
        props?.CashReceiptsfrom2?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>My Personal Money I added to business</td>
        {
        props?.MyPersonalMoneyIaddedtobusiness?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Borrowed (Money I collect from Investor or someone)</td>
        {
        props?.Borrowed?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Cash Paid for</h5></th>
        {
        props?.CashPaidfor2?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Loan Repayment</td>
        {
        props?.LoanRepayment2?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr>
        <td>Dividends</td>
        {
        props?.Dividends?.map((r,index)=>(
            <td>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "limegreen"}}>
        <th scope="row"><h5>Net Cash Flow from Financing Activites	</h5></th>
        {
        props?.NetCashFlowfromFinancingActivites?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
          <tr>
            <td style={{backgroundColor: "white"}}>Net Increase in Cash	</td>
            {
              props?.NetIncreaseinCash?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>
            
            <tr>
            <td style={{backgroundColor: "white"}}>Cash At The Beginning of Period	</td>
            {
              props?.CashAtTheBeginningofPeriod?.map((p)=>(
            <td>{p}</td>
              ))
            }
            </tr>

            <tr>
            <td style={{backgroundColor: "white"}}>Cash At The End of Period</td>
            {
              props?.CashAtTheEndofPeriod?.map((p)=>(
            <td>{p}</td>
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