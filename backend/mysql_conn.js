const mysql = require('mysql')
let mysql_conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",       
    database: "pds"
})

module.exports = mysql_conn