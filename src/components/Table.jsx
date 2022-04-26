import react,{useEffect, useState} from 'react'
import { axiosInstance } from '../../config';

const Table = (props)=>{

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
        <th scope="col" colSpan={"10"}><span className='text-white w-100 p-0 no-select'>Income Statement</span></th>
      </tr>
      <tr className='cash-title text-white'>
        <th scope="col" colSpan={"10"}><h3 className='text-white w-100 p-0'>Income Statement</h3></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><h5>Revenue</h5></th>
      </tr>
      {
        props?.selectedSales?.map((r,index)=>(
          <tr>
            <td>{r}</td>
            {
              props?.prices[index]?.map((p)=>(
            <td>{"RF "+p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              ))
            }
            </tr>
        ))
      }

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Total Revenue	</h5></th>
        {
        props?.totalRevenues?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr>
        <th scope="row"><h5>COGs</h5></th>
      </tr>
      {
        props?.selectedSales?.map((r,index)=>(
          <tr>
            <td>{r}</td>
            {
              props?.prices2[index]?.map((p)=>(
            <td>{"RF "+p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              ))
            }
            </tr>
        ))
      }

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Total COGs	</h5></th>
        {
        props?.totalcogs?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "lavender"}}>
        <th scope="row"><h5>Gross Profit	</h5></th>
        {
        props?.grossProfits?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr>
        <th scope="row"><h5>Operating Expenses</h5></th>
      </tr>
      {
        props?.selectedExpenses?.map((r,index)=>(
          <tr>
            <td>{getCatName(r)}</td>
            {
              props?.prices4[index]?.map((p)=>(
            <td>{"RF "+p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              ))
            }
            </tr>
        ))
      }

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Total Operation Expenses</h5></th>
        {
        props?.totalOpEx?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "lavender"}}>
        <th scope="row"><h5>Operating Profit</h5></th>
        {
        props?.opProfit?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr>
        <th scope="row"><h5>Non-Operating Expenses</h5></th>
      </tr>
      {
        props?.selectedNonExpenses?.map((r,index)=>(
          <tr>
            <td>{getCatName(r)}</td>
            {
              props?.prices5[index]?.map((p)=>(
            <td>{"RF "+p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              ))
            }
            </tr>
        ))
      }

<tr style={{backgroundColor: "skyblue"}}>
        <th scope="row"><h5>Total Non- Operation Expenses</h5></th>
        {
        props?.totalNonOpEx?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

      <tr style={{backgroundColor: "limegreen"}}>
        <th scope="row"><h5>Net Income</h5></th>
        {
        props?.NetIncome?.map((r,index)=>(
            <td className='fw-bold'>{r}</td>
        ))
      }
      </tr>

    </tbody>

    <tbody>
      <tr>
        <th scope="row"><h5>The Margins</h5></th>
      </tr>
          <tr>
            <td>Gross profit Margin</td>
            {
              props?.grossMargins?.map((p)=>(
            <td>{getP(p)}</td>
              ))
            }
            </tr>
            <tr>
            <td>Operating Margin</td>
            {
              props?.opMargins?.map((p)=>(
            <td>{getP(p)}</td>
              ))
            }
            </tr>

            <tr>
            <td>Net Profit Margin</td>
            {
              props?.NetProfitMargin?.map((p)=>(
            <td>{getP(p)}</td>
              ))
            }
            </tr>
            

      </tbody>

  </table>
</div>
        </>
    )
}

export default Table;