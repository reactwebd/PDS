import React from "react";
import "../Styles/TestTrans.css";
import UseFetcher from "../../hooks/UseFetcher";
// import { useLocation } from "react-router-dom";





const Delete:React.FC<{id:number,amount:number,type:string,fastde:(id:number,amount:number,type:string)=>void}>=(props) =>{
    // let location = useLocation()
  const { loader, error, RDH: deleddata } = UseFetcher();
  const deletebutton  = (respo:any) => {
    let a = props.id;
    props.fastde(props.id,props.amount,props.type)
    let reqconfig:{url:string,met:string,body:null,head:undefined}={
      url: `http://localhost:8000/api/exams/${a}/`,
      met: "DELETE",
      body : null,
      head : undefined
    }
    deleddata(reqconfig,deletebutton);
    console.log(respo)
  }
  return (
    <button
      className="delete-styled-button"
      onClick={deletebutton}
    >
      {loader=== true ? "Deleting..." : "Delete"}
      {error !==null && <p>{error}</p>}
    </button>
  );
}
export default Delete