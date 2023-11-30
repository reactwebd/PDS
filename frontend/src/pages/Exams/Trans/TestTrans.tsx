import "./TestTrans.css";
// import Delete from "./Delete";
// import UseFetcher from "../../hooks/UseFetcher";

export default function TestTrans(props:any) {
console.log(props.key)
  
  return (
    <>

          <tr key={props.key}>
            <td>{props.date}</td>
            <td>{props.type}</td>
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
