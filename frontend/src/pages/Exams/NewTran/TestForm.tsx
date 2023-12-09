import React, { useRef } from "react";
import "../../../components/Styles/TestForm.css";
import UseFetcher from "../../../hooks/UseFetcher";

export default function TestForm(props:any) {
  const typeref:any = useRef("")
    const dateref:any = useRef("")
    const subref:any = useRef("")
    const marref:any = useRef("")
    const amoref:any = useRef("")
    const exref:any = useRef("")
    const {loader,error,RDH : poster} = UseFetcher()
  
    const post = (e:any) => {
      e.preventDefault()
      // let id = 
      let type:string = typeref.current.value
      let date:string = dateref.current.value
      let sub:string = subref.current.value
      let mar:number = marref.current.value
      let amount:number = amoref.current.value
      let exam:string = exref.current.value
      
      interface formtype {
        Id : number,
        Type : string,
        Date : string,
        Subject : string,
        Marks : number,
        Amount : number,
        ExamName : string
      }
      let formobj:formtype = {
          Id : Math.random(),
          Type : type,
          Date : date,
          Subject : sub,
          Marks : mar,
          Amount : amount,
          ExamName : exam
      }
      if(formobj.Type === "" || formobj.Date === "" ||  formobj.Subject === "" || formobj.Marks === 0 || formobj.Amount === 0 || formobj.ExamName === ""){
          alert("Please fill the form")
      }
      else{
          props.fast(formobj)
          console.log(formobj)
          try{
            let reqconf:{url : string,met : string,body : formtype,head : any} = {
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
  const buttonpost = (event:any) => {
    // console.log(typ
    post(event)
  }
 
  return (
    <div className="form-container">
      {error !== null && <p>error caused : {error}</p>}
      <h2>The the Income or expence of the Test</h2>
      <form>
        <label htmlFor="">Date</label>
        <input type="date" placeholder="Enter the name of test" required ref={dateref} />

        <label htmlFor="">Entry type</label>
        <select id="colors" name="colors" required ref={typeref}>
            <option>Recipt</option>
            <option>Payment</option>
        </select>    

        <label htmlFor="">Subject</label>
        <input type="text" placeholder="Enter the subject of test" required ref={subref} />

        <label htmlFor="">Marks</label>
        <input type="number" placeholder="Enter the marks of test" required ref={marref}/>

        <label htmlFor="">Amount</label>
        <input type="number" placeholder="Enter the amount of test" required ref={amoref}/>

        <label htmlFor="">Name of exam</label>
        <input type="text" placeholder="Enter the name of test" required ref={exref}/>

        <button type="submit" onClick={buttonpost}>{loader === true ? "Submitting..." :"Submit"}</button>
      </form>
    </div>
  );
}