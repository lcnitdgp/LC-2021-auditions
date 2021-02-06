const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;

app.get('/',(req,res)=>{
    res.send("Hello Worldd");
})

app.listen(PORT,()=>{
    console.log("The server is active on :",PORT);
})