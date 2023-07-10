const express =  require('express');
const config = require('config');

const appForEmps = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });


//GET = SELECT FROM DB
appForEmps.get("/", (request, response)=>{
    //response.send("EMPS GET IS CALLED");
    console.log("EMPS GET - Request Received...")
    connection.query("select * from Employee_Tb", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

//POST = INSERT INTO DB
appForEmps.post("/", (request, response)=>{
    
    console.log("EMPS POST - Request Received...");
    console.log("Data Received is as below..")
    console.log(request.body)
    var query = 
    `insert into Employee_Tb values(${request.body.id}, 
                                    '${request.body.e_name}',
                                    '${request.body.email}',
                                    '${request.body.password}',
                                    ${request.body.emp_id},
                                    '${request.body.dname}',
                                    '${request.body.doj}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

//PUT = UPDATE INTO DB
appForEmps.put("/:id", (request, response)=>{
    var query = 
    `update Employee_Tb set dname = '${request.body.dname}',
                            doj = '${request.body.doj}' 
                            where  id= ${request.params.id}   `;
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})






// appForEmps.put("/:e_name",(request,response)=>{
//     var query1=`update Employee_Tb set id=${request.body.id},d_name=${request.body.d_name} where where e_name=${request.params.e_name}`;
     
//      connection.query(query1,(error,result)=>{
//         if(error==null){
//             var data =JSON.stringify(result)
//             response.setHeader("Content-Type","application/json");
//             response.write(data);
//         }
//         else{
//             console.log(error);
//                     response.setHeader("Content-Type","application/json");
//                     response.write(error)
//         }
//         response.end();
//     })
// })






//DELETE  = DELETE FROM DB
appForEmps.delete("/:id", (request, response)=>{
    // response.send("EMPS DELETE IS CALLED");
    var query = 
    `delete from Employee_Tb where id = ${request.params.id}`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

module.exports = appForEmps;