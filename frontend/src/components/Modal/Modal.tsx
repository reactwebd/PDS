import React,{useRef} from "react";
import "../Styles/Modal.css";
import UseFetcher from "../../hooks/UseFetcher";
import { useNavigate, useLocation } from "react-router-dom";

  interface FOT  {
    Id : number,
    Type : string,
    Date : string,
    Subject : string,
    Marks : number,
    Amount : number,
    ExamName : string
  }
 const Modal:React.FC<{fastu:(id : number,formobj:FOT)=>void,objs : FOT[]}>=(props) =>{
  const typeref:string|any = useRef("")
  const dateref:string|any = useRef("")
  const subref:string|any = useRef("")
  const marref:string|any = useRef("")
  const amoref:string|any = useRef("")
  const exref:string|any = useRef("")
  // const [body, setBody] = useState<>(null)
  const {loader,error,RDH : updater}= UseFetcher()
  const location = useLocation()
  let path :string = location.pathname
  let strarr : string[] = path.split("/:")
  let uid : number  = parseFloat(strarr[1])
  const navigate =  useNavigate()

  const secondHand = (e:any) => {
    e.preventDefault()
    let date = dateref.current.value
    let type = typeref.current.value
    let sub = subref.current.value
    let mar = marref.current.value
    let amount = amoref.current.value
    let exam = exref.current.value
    console.log(uid,isNaN(uid))
    let formobj : FOT = {
        Id : Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
        Type : type,
        Date : date,
        Subject : sub,
        Marks : mar,
        Amount : amount, 
        ExamName : exam
      }
      if( formobj.Date ==="" || formobj.Subject === "" || formobj.Marks === 0 || formobj.Amount === 0 || formobj.ExamName === ""){
        alert("Please fill the form")
    }
    else{
        
      props.fastu(uid,formobj)
        navigate("/")
          console.log(formobj)
          
        }
      
      
      
    //  secondHand
    // let id:number = props.uid
    updater({
      url : `http://localhost:8000/api/exams/${uid}`,
      met : "PUT",
      body : formobj,
      head : {
        "Content-Type" : "application/json"
      } 
    },secondHand)
    // props.onCancel()
    // console.log(respo)
    }
  
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={()=>{
          navigate("/")
        }}>&times;</span>
        <h2>Modal Form</h2>
        <form>
        <label htmlFor="">Date</label>
        <input type="date" placeholder="Enter the name of test" required ref={dateref}  />

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
        {error!==null&&<p>{error}</p>}
      </form>
      </div>
  </div>
  );

}
export default Modal