import React, { useState,useEffect } from "react";
import Layout  from "./components/layout/Layout";
import TestForm from './components/Exams/NewTran/TestForm';
import TestTrans from './components/Exams/Trans/TestTrans';
import Modal from './components/Exams/Modal/Modal'
import UseFetcher from './hooks/UseFetcher';
import Delete from "./components/Exams/Trans/Delete";
import Update from "./components/Exams/Trans/Update";
import './components/Exams/Trans/TestTrans.css'
import BidForm from "./components/Bid/Newbid/BidForm";
import { Route, Routes } from "react-router-dom";
// import {createBrowserRouter} from "react-router-dom"

export default function App() {
   interface RTIS  {
    // key : number,  
    id : number,
    type : string,
    date:string,
    subject:string,
    mark:number,
    amo:number,
    en:string
  }
  const [clicked, setClicked] = useState<boolean>(false)
  const [UpdateId, setUpdateId] = useState<number>(0)
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
      if (typeof error !== null) {
        console.log(error);
      } else {
        let loadedData:any | RTIS[]
        loadedData = [...responseData]
        console.log(loadedData);
        setData(loadedData);
        let profit = 0;
        let loss = 0;
        for (let i = 0; i < loadedData.length; i++) {
          if (loadedData[i].type === "Recipt") {
            profit = profit + loadedData[i].amo;
          } else {
            loss = loss + loadedData[i].amo;
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
  }, [fetcher, error]);

  const handleClick = (id:number) => {
    setClicked((prevClicked)=>!prevClicked)
    setUpdateId(id)
  }
  const fastData = (da:responseType)=>{
    // let newData = [...data,da]
    
    console.log(total)
    setData((prevData)=>prevData.concat({
      id : da.Id,
      type  : da.Type,
      date : da.Date,
      subject : da.Subject,
      mark : da.Marks,
      amo : da.Amount,
      en : da.ExamName
    }))
    if(da.Type === "Recipt"){
      // let tot = total
      // let added = da.Amount
      // tot = tot + added
      setTotal(prevTotal=>prevTotal+da.Amount);//This is returns result as string.Such if there is an entry of 100 and I put one more entry of 100 it returns 100100 instead 200
    }
    else{
      console.log(total)
      // let newTotal = total+da.Amount
      setTotal((prevTotal) => prevTotal - da.Amount)
    }  
  }
  const fastdelete = (id:number,amount:number,type:string)=>{
    let narr = data.filter((obj : {id:number})=>obj.id !== id)
    setData(narr)
    console.log(data)
    if(type === "Recipt"){
      setTotal((prevTotal)=>prevTotal-amount)
    }
    else{
      setTotal((prevTotal)=>prevTotal+amount)
    }
  }
  const fastu = (id:number,obj:{Id : number,Type : string,Date:string,Subject:string,Mark:number,Amount:number,Exam:string})=>{
    type updatetype = {
      id : number,
      type : string,
      date : string,
      subject : string,
      mark : number,
      amo : number,
      en : string
    }
    data.forEach((updateele : updatetype) =>{
      if(updateele.id === id){
        updateele.id = obj.Id
        updateele.type  = obj.Type
        updateele.date = obj.Date
        updateele.subject = obj.Subject
        updateele.mark = obj.Mark
        updateele.amo = obj.Amount
        updateele.en = obj.Exam
      }
    })
    if(obj.Type === "Recipt"){
      setTotal((prevTotal)=>prevTotal+obj.Amount)
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

      {data.map((obj:{id:number,date:string,type:string,subject:string,mark:number,amo:number,en:string})=>(
        <>  
        {clicked && <Modal fastu={fastu} uid={UpdateId} onClose={handleClick}/>}
         <TestTrans 
            key={obj.id}
            date={obj.date}
            type={obj.type}
            subject={obj.subject}
            marks={obj.mark}
            amount={obj.amo}
            examname={obj.en}
            component1 = {<Delete 
              id={obj.id} 
              amount={obj.amo}
              type={obj.type}
              fastde= {fastdelete}
            />}
            component2 = {<Update id={obj.id} onChange={handleClick} />}
            data={obj}
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
      element = {<BidForm/>}
      /> 
      <Route
      path="/*"
      element = {<h1>Page not 404</h1>}
      />
      </Routes>
    </Layout>
  );
}