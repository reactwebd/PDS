const mysql = require('mysql')
let mysql_conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",       
    database: "pds"
})
export default mysql_conn