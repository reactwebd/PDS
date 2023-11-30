import React,{useRef,useState} from "react";
import "./Modal.css";
import UseFetcher from "../../hooks/UseFetcher";


  type FOT = {
    Id : number,
    Type : string,
    Date : string,
    Subject : string,
    Mark : number,
    Amount : number,
    Exam : string
  }
 const Modal:React.FC<{uid : number,fastu:(id : number,formobj:FOT)=>void,onCancel:()=>void}>=(props) =>{
  const typeref:string|any = useRef("")
  const dateref:string|any = useRef("")
  const subref:string|any = useRef("")
  const marref:string|any = useRef("")
  const amoref:string|any = useRef("")
  const exref:string|any = useRef("")
  // const [body, setBody] = useState<>(null)
  const {loader,error,RDH : updater}= UseFetcher()
  const secondHand = (e:any) => {
    e.preventDefault()
    let id = props.uid
    let date = dateref.current.value
    let type = typeref.current.value
    let sub = subref.current.value
    let mar = marref.current.value
    let amount = amoref.current.value
    let exam = exref.current.value
    let formobj : FOT = {
        Id : Math.random(),
        Type : type,
        Date : date,
        Subject : sub,
        Mark : mar,
        Amount : amount, 
        Exam : exam
      }
      if( formobj.Date ==="" || formobj.Subject === "" || formobj.Mark === 0 || formobj.Amount === 0 || formobj.Exam === ""){
        alert("Please fill the form")
    }
    else{
      props.fastu(id,formobj)
        console.log(formobj)
    //  secondHand
    // let id:number = props.uid
    updater({
      url : `http://localhost:8000/api/exams/${id}`,
      met : "PUT",
      body : formobj,
      head : {
        "Content-Type" : "application/json"
      }
    },secondHand)
    props.onCancel()
    // console.log(respo)
    }
  }
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.onCancel}>&times;</span>
        <h2>Modal Form</h2>
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

        <button type="submit" onClick={secondHand}>{loader === true ? "Updating the entry..." : "Update the entry"}</button>
      </form>
      </div>
  </div>
  );
}
export default Modal