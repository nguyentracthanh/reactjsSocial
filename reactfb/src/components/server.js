var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'thanhnt',
  password: '123456',
  database: 'mbf'
});

connection.connect(function(error){
  (error) ? console.log('error') : console.log('connected');
});

app.get('/', function(req, resp) {
  connection.query("SELECT * FROM f_user", function(error,rows,fields){
    if (!!error) {
       console.log('error')
      }else{
        console.log('success\n')
        console.log(rows)
      }
      
      
  });
})

app.listen(1234);