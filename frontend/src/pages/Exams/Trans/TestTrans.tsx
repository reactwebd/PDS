import React from 'react'
import "../../../components/Styles/TestTrans.css";
// import Delete from "./Delete";
// import UseFetcher from "../../hooks/UseFetcher";

const TestTrans:React.FC<{key:number,date:string,type:string,subject:string,marks:number,amount:number,examname:string,component1:any,component2:any}> = (props)=> {
console.log(props.key)
  
  return (
    <>

          <tr key={props.key}>
            <td>{props.type}</td>
            <td>{props.date}</td>
            <td>{props.subject}</td>
            <td>{props.marks}</td>
            <td>{props.amount}</td>
            <td>{props.examname}</td>
            <td>
            {props.component1}
            {props.component2}
            </td>
          </tr>
   
    </>
  );
}
export default TestTrans