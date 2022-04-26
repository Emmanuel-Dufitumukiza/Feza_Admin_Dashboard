import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './components/Login'
import SMB from './components/SMB'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Investors from './components/Investors';
import Dashboard from './components/Dashboard';
import IncomeStatement from './components/IncomeStatement';
import ForgotPassword from './components/ForgotPassword';
import Check from './components/Check';
import ResetCheck from './components/ResetCheck';
import PageNotFound from './components/PageNotFound'
import NewPassword from './components/NewPassword';
import CashFlow from './components/CashFlow';
import BalanceSheet from './components/BalanceSheet';

function App() {
  return (
  <>
  <BrowserRouter>
         <Routes>
           <Route path="/" exact element={<Login />} />
           <Route path="/addsmb" exact element={<SMB />} />
           <Route path="/investors" exact element={<Investors />} /> 
           <Route path="/dashboard/:id" exact element={<Dashboard />} /> 
           <Route path="/incomestatement/:id" exact element={<IncomeStatement />} /> 
           <Route path="/forgotpassword" exact element={<ForgotPassword />} /> 
           <Route path="/check" exact element={<Check />} /> 
           <Route path="/resetpassword/:id/:link" exact element={<ResetCheck />} /> 
           <Route path="/pagenotfound" exact element={<PageNotFound />} /> 
           <Route path="/emailsent" exact element={<NewPassword />} /> 
           <Route path="/CashFlow/:id" exact element={<CashFlow />} /> 
           <Route path="/BalanceSheet/:id" exact element={<BalanceSheet />} /> 
         </Routes>
       </BrowserRouter>
  </>
  )
}

export default App
