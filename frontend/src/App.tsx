import React, { useState,useEffect } from "react";
import Layout  from "./components/layout/Layout";
import TestForm from './pages/Exams/NewTran/TestForm';
import TestTrans from './pages/Exams/Trans/TestTrans';
import Modal from './components/Modal/Modal'
import UseFetcher from './hooks/UseFetcher';
import Delete from "./components/Buttons/Delete";
import Update from "./components/Buttons/Update";
import './components/Styles/TestTrans.css'
import BidForm from "./pages/Bid/Newbid/BidForm";
import { Route, Routes } from "react-router-dom";
// import {createBrowserRouter} from "react-router-dom"

export default function App() {
 interface RTIS{
  Id:number,
  Type:string,
  Date:string,
  Subject:string,
  Marks : number,
  Amount : number,
  ExamName  :string
 }
  // const [UpdateId, setUpdateId] = useState<number>(0)
  const [data, setData]= useState<RTIS[]>([])
  const [total, setTotal] = useState<number>(0)
  const {loader,error,RDH : fetcher} = UseFetcher()
 
  interface responseType {
  Id : number,
  Type : string,
  Date : string,
  Subject : string,
  Marks : number,
  Amount : number,
  ExamName : string,
  }

  
  useEffect(() => {
    const get = (responseData:responseType[]) => {
      if (error !== null) {
        console.log(error);
      } else {
        console.log(responseData)
        // alert(responseData)
       setData(responseData)
    
        let profit = 0;
        let loss = 0;
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].Type === "Recipt") {
            profit = profit + responseData[i].Amount;
          } else {
            loss = loss + responseData[i].Amount;
          }
        }
        setTotal(profit - loss)  
      }
    };
    let reqconfig:{url:string,met:string,body:null,head:undefined} = {
      url: "http://localhost:8000/api/exams",
      met: "GET",
      body : null,
      head : undefined
    }
    fetcher(
      reqconfig,
      get
    );
    
  }, []);

  
  
  const fastData:(da:responseType)=>void = (da:responseType)=>{
    // let newData = [...data,da]
    
    console.log(total)
    setData((prevData)=>[...prevData,da])
    if(da.Type === "Recipt"){ 
      // let tot = total
      // let added = da.Amount
      // tot = tot + added
      setTotal(prevTotal=>prevTotal+parseInt(da.Amount.toString()));//This is returns result as string.Such if there is an entry of 100 and I put one more entry of 100 it returns 100100 instead 200
    }
    else{
      console.log(total)
      // let newTotal = total+da.Amount
      setTotal((prevTotal) => prevTotal - da.Amount)
    }  
  }
  const fastdelete: (id:number,amount:number,type:string)=>void= (id,amount,type)=>{
    let narr = data.filter((obj : {Id:number})=>obj.Id !== id)
    setData(narr)
    console.log(data)
    if(type === "Recipt"){
      setTotal((prevTotal)=>prevTotal-amount)
    }
    else{
      setTotal((prevTotal)=>prevTotal+parseInt(amount.toString()))
    }
  }
  const handlebid:(bidobj:{BId:number,Condition:string,BDate:string,BType:string,Duration:number,BAmount:number})=>void = (bidobj)=>{
    console.log(bidobj)
  }
  const fastu : (id:number,obj:{Id : number,Type : string,Date:string,Subject:string,Marks:number,Amount:number,ExamName:string})=>void = (id,obj)=>{

   
    data.forEach((updateele : RTIS) =>{
      if(updateele.Id === id){
        updateele.Id = obj.Id
        updateele.Type  = obj.Type
        updateele.Date = obj.Date
        updateele.Subject = obj.Subject
        updateele.Marks = obj.Marks
        updateele.Amount = obj.Amount
        updateele.ExamName = obj.ExamName
      }
      else{
        alert("ID_DOSEN'T_MATCH")
        console.log(updateele.Id.toString())
      }
    })
    if(obj.Type === "Recipt"){
      setTotal((prevTotal)=>prevTotal+parseInt(obj.Amount.toString(obj.Amount)))
    }
    else{
      setTotal((prevTotal)=>prevTotal-obj.Amount)
    }
  }
  return (
    <Layout>
      <Routes>
        <Route
        path="/"
        element={
        <>
        <TestForm 
        fast={fastData}/>
        {loader === true && <p>Loading data...</p>}
        {error !== null && <p>{error}</p>}
         <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Amount</th>
            <th>Exam Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

      {data.map((obj:RTIS)=>(
        <>  
         <TestTrans 
            key={obj.Id}
            date={obj.Date}
            type={obj.Type}
            subject={obj.Subject}
            marks={obj.Marks}
            amount={obj.Amount}
            examname={obj.ExamName}
            component1 = {<Delete 
              id={obj.Id} 
              amount={obj.Amount}
              type={obj.Type}
              fastde= {fastdelete}
            />}
            component2 = {<Update id={obj.Id} />}
         />
         
        </>
      ))}
        </tbody>
        </table>
        
        <hr/>
              <p  style={{marginLeft : "955px"}}>{`${total}`}</p>
        </>
      }
      />
      <Route 
        path={`/exam_update/:uid`}
        element={
          <>
          <Modal fastu={fastu} objs={data}/>
        <TestForm 
        fast={fastData}/>
        {loader === true && <p>Loading data...</p>}
        {error !== null && <p>{error}</p>}
         <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Amount</th>
            <th>Exam Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

      {data.map((obj:RTIS)=>(
        <>  
         <TestTrans 
            key={obj.Id}
            type={obj.Type}
            date={obj.Date}
            subject={obj.Subject}
            marks={obj.Marks}
            amount={obj.Amount}
            examname={obj.ExamName}
            component1 = {<Delete 
              id={obj.Id} 
              amount={obj.Amount}
              type={obj.Type}
              fastde= {fastdelete}
            />}
            component2 = {<Update id={obj.Id} />}
         />
         
        </>
      ))}
        </tbody>
        </table>
        
        <hr/>
              <p  style={{marginLeft : "955px"}}>{`${total}`}</p>
        </>
      }
      />
      <Route
      path="/bid"
      element = {<BidForm fastbid={handlebid}/>}
      /> 
      <Route
      path="/*"
      element = {<h1>Page not 404</h1>}
      />
      </Routes>
    </Layout>
  );
}