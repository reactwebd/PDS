import cors from 'cors'
import express,{Application, Request, Response} from 'express'
// import mysql_conn from './mysql_conn.ts'

const app:Application= express()
// console.log(typeof(app))
app.use(cors())
app.use(express.json())
type datatype ={
  Id : number,
  Type : string,
  Date : string,
  Subject : string,
  Marks : number,
  Amount : number,
  ExamName :  string
}
type bidtype ={
  Id : number,
  
}

let loadedData : datatype[] = [{
  Id:0,
Type:"Recipt",
Date: "25/10/2023",
Subject:"Computer",
Marks:26,
Amount:100,
ExamName:"Weekly test"

}]
// mysql_conn.getConnection(function (err : any) {
//   if (err) throw err;   
//   console.log("Connected!");
// });
app.get("/api/exams/",(req:Request,res:Response  )=>{
  //  mysql_conn.query("SELECT * FROM `exam-entreis`",function(error,result,feilds){
  //   if(error) throw error
  //   res.send(result)
  // })
  
  res.send(loadedData)
  console.log(loadedData)
})
app.get("/api/bid",(req:Request,res:Response)=>{

})
app.post("/api/exams/",(req : Request,res:Response)=>{

  // mysql_conn.query("INSERT INTO `exam-entreis` (`Id`,`Type`, `Date`, `Subject`, `Marks`, `Amount`, `ExamName`) VALUES ('"+req.body.Id+"','"+req.body.Type+"', '"+req.body.Date+"', '"+req.body.Subject+"', '"+req.body.Mark+"', '"+req.body.Amount+"', '"+req.body.Exam+"');",
  // function(error,result,feilds){
  //   if(error) throw error
  //   res.send(result)
  //  })
  loadedData=[...loadedData,req.body]
  res.json({message:"Success"})
})

app.delete("/api/exams/:id", (req : Request,res:Response) => {
  // const deleteId = req.params.id
  // res.setHeader("Custom-Header", "value");
  // if (req.headers["custom-header"] !== "value") {
  //   res.status(400).json({ error: "Custom header not provided" });
  //   return;
  // }

  // mysql_conn.query("DELETE FROM `exam-entreis` WHERE TRIM(Id) = "+deleteId.toString()+"", function (error, fields) {
  //   if (error) {
  //     res.status(500).json({ error: "Internal Server Error" + error });
  //   } else {
  //     res.status(200).json({ message: `Record with ID ${deleteId} has been deleted successfully` });
  //   }
  // });

  try{
    const deleteId : string = req.params.id;
    let fd2 = loadedData.filter((obj : any)=>obj.Id.toString(obj.Id) !== deleteId)
    loadedData = fd2
    res.status(200).json({message : "Code is working successfully with Id : "+deleteId + "array:"+loadedData.length})
  }
  catch(error){
    res.status(500).json({message : "Internel Server Error" + error})
  }
});

app.put("/api/exams/:id", (req : Request, res : Response) => {
  let UpdateId : string = req.params.id
  let nuid : number = parseFloat(UpdateId)
  loadedData.forEach((puter:datatype)=>{
    if(puter.Id == nuid){
      puter.Id = req.body.Id
      puter.Type = req.body.Type 
      puter.Date = req.body.Data,
      puter.Subject = req.body.Subject
      puter.Marks = req.body.Marks
      puter.Amount = req.body.Amount 
      puter.ExamName = req.body.ExamName
    }
  })
  // mysql_conn.query("UPDATE `exam-entreis` SET `Type`='"+req.body.Type+"',`Date`='"+req.body.Date+"',`Subject`='"+req.body.Subject+"',`Marks`='"+req.body.Mark+"',`Amount`='"+req.body.Amount+"',`ExamName`='"+req.body.Exam+"' WHERE TRIM(Id)="+UpdateId.toString()+"",function(error,fields){
  //   if(error){
  //     res.status(500).json({message : "INTERNAL_SERVER_ERROR" + error})
  //   }
  //   else{
  //     res.status(200).json({message : "Data such as "+req.body.Subject+" etc were updated successfully under "+UpdateId})
  //   }
  // })
 
});

app.listen(8000,()=>{
    console.log("The app is running of the server...")
})//Is there any mistake in this above code