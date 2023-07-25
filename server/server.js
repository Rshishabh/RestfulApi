require("dotenv").config();  //requiring env file for database add


const express=require("express");
const app=express();


require("./db/conn");


const cors=require("cors");  //when our backend and frontend both have different ports then to remove crossorigin error we use cors


const router = require("./routes/router")


const PORT = 5004;


app.use(cors());

app.use(express.json()); 

app.use(router);

//get request to start server

// app.get("/",(req,res)=>{

//      res.status(200).send({
//             message:'Succesfully Server Started'
//         });
// })


//listen server

app.listen(PORT,()=>{

    console.log(`server started at port ${PORT}`);
})