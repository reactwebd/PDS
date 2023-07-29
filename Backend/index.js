const express = require("express");
const cors = require("cors");
const conn = require("./mysql_conn");

const app = express();
app.use(cors());
app.use(express.json());

let entry = 0;

app.get("/api/exam_entris", (req, res) => {
  conn.query("SELECT * FROM `exam-entreis`", function (error, result, fields) {
    if (error) throw error;
    res.send(result);
  });
});

app.post("/api/exam_entris", (req, res) => {
  // res.writeHead(200, { "Content-Type": "application/json" });
  entry = entry + 1;
  // const { Type, Date, Subject, Marks, Amount } = req.body.markobj;
  conn.query(
    "INSERT INTO `exam-entreis` (`Type`, `Date`, `Subject`, `Marks`, `Amount`) VALUES (?, ?, ?, ?, ?)",
    [req.body.markobj.Type, req.body.markobj.Date, req.body.markobj.Subject, req.body.markobj.Marks, req.body.markobj.Amount],
    // ...
  
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to insert data into the database" });
      } else {
        res.json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running");
});
