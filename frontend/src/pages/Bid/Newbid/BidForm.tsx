import React, { useRef } from "react";
import "../../Exams/NewTran/TestForm.css";
import UseFetcher from "../../../hooks/UseFetcher";

export default function BigForm(props:any) {
  const conditionref :string| any = useRef("")
    const amountref : number|any = useRef(0)
    const typeref : string|any = useRef("")
    const dateref : string|any = useRef("")
    const monthsref : number|any = useRef(0)
    const {loader,error,RDH : poster} = UseFetcher()
  
    const post = (e:React.FormEvent) => {
      e.preventDefault()
      let condition:string = conditionref.current.valueOf
      let price:number = amountref.current.valueOf
      let duration:number = monthsref.current.valueOf
      let type:string = typeref.current.valueOf
      let date:string = dateref.current.valueOf

      let formobj : {Id:number,Condition:string,Date:string,Type:string,Duration:number,Amount:number} = {
          Id : Math.random(),
          Condition : condition,
          Date : date,
          Type : type,
          Duration : duration,
          Amount : price
      }
      if( formobj.Condition ==="" || formobj.Date === "" || formobj.Type === "" || formobj.Duration === 0 || formobj.Amount === 0){
          alert("Please fill the form")
      }
      else{
          props.fast(formobj)
          console.log(formobj)
          try{
            type bodyT = {
              Id : number,
              Condition:string,
              Date:string,
              Type:string,
              Duration : number,
              Amount : number
            }
            let reqconf : {url : string,met:string,body:bodyT,head : any} = {
              url : "http://localhost:8000/api/exams",
              met : "POST",
              body : formobj,
              head : {
                "Content-Type" : "application/json"
              }
            }
            poster(reqconf,post)
          }
          catch(err){
            console.log(err)
          }
    }
  }
  
 
  return (
    <div className="form-container">
      {/* {error !== null && <p>error caused : {error}</p>} */}
      <h2>The the Income or expence of the Bid</h2>
      <form>
        <label htmlFor="">Date</label>
        <input type="date" placeholder="Enter the name of test" required ref={dateref} />

        <label htmlFor="">Entry type</label>
        <select id="colors" name="colors" required ref={typeref}>
            <option>Recipt</option>
            <option>Payment</option>
        </select>    

        <label htmlFor="">Condition</label>
        <input type="text" placeholder="Enter the subject of test" required ref={conditionref} />

        <label htmlFor="">Months</label>
        <input type="number" placeholder="Enter the marks of test" required ref={monthsref}/>

        <label htmlFor="">Amount</label>
        <input type="number" placeholder="Enter the amount of test" required ref={amountref}/>

        <button type="submit" onClick={post}>Submit</button>
      </form>
    </div>
  );
}