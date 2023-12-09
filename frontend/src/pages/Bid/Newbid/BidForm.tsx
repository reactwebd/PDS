import React, { useRef } from "react";
import "../../../components/Styles/TestTrans.css";
import UseFetcher from "../../../hooks/UseFetcher";

const BidForm:React.FC<{fastbid:(bidobj : {BId:number,Condition:string,BDate:string,BType:string,Duration:number,BAmount:number})=>void}>=(props)=> {
  const conditionref :string| any = useRef("")
    const amountref : number|any = useRef(0)
    const typeref : string|any = useRef("")
    const dateref : string|any = useRef("")
    const monthsref : number|any = useRef(0)
    const {loader,error,RDH : poster} = UseFetcher()
  
    const post = (e:React.FormEvent) => {
      e.preventDefault()
      let condition:string = conditionref.current.value
      let price:number = amountref.current.value
      let duration:number = monthsref.current.value
      let type:string = typeref.current.value
      let date:string = dateref.current.value

      let formobj : {BId:number,Condition:string,BDate:string,BType:string,Duration:number,BAmount:number} = {
          BId : Math.random(),
          Condition : condition,
          BDate : date,
          BType : type,
          Duration : duration,
          BAmount : price
      }
      if( formobj.Condition ==="" || formobj.BDate === "" || formobj.BType === "" || formobj.Duration === 0 || formobj.BAmount === 0){
          alert("Please fill the form")
      }
      else{
          props.fastbid(formobj)
          console.log(formobj)
          try{
            type bodyT = {
              BId : number,
              Condition:string,
              BDate:string,
              BType:string,
              Duration : number,
              BAmount : number
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

        <button type="submit" onClick={post}>{loader === true ? "Submitting..." : "Submit"}</button>
        {error!=null && <p>{error}</p>}
      </form>
    </div>
  );
}
export default BidForm