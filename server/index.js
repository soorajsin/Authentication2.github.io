const express=require("express");
const app=express();
const port=4000;


app.get("/", (req, res)=>{
          res.status(201).json({error: "Server Created...."})
})




app.listen(port, ()=>{
          console.log(`server is running on ${port}`)
})