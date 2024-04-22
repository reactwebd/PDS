import React from "react";
import "../Styles/TestTrans.css";
import UseFetcher from "../../hooks/UseFetcher";
// import { useLocation } from "react-router-dom";

const Delete:React.FC<{id:number,amount:number,type:string,fastde:(id:number,amount:number,type:string)=>void}>=(props) =>{
    // let location = useLocation()
  const { loader, error, RDH: deleddata } = UseFetcher();
  const deletebutton = (respo:any) => {
    const { id, fastde, amount, type } = props;
    console.log(respo);
    fastde(id, amount, type);

    const reqconfig = {
      url: `http://localhost:8000/api/exams/${id}/`,
      met: "DELETE",
      body: null,
      head: {}
    };
    deleddata(reqconfig, deletebutton);
  };
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