const mongoose=require("mongoose");


const db="mongodb+srv://soorajsingh7505:sooraj231@crud-app.4oebebt.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(db, {
          useUnifiedTopology:true,
          useNewUrlParser:true
}).then(()=>console.log("Database Connected...")).catch((error)=>{
          console.log(`Error in connecting to database ${error}`);
})