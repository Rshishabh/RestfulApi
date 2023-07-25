const mongoose = require("mongoose");

const DB = process.env.DATABASE; //to access DATABASE key in mongoose

mongoose.connect(DB,{

    useUnifiedTopology:true,
    useNewUrlParser:true

}).then(()=>console.log("Database Connected")).catch((err)=>{
    console.log("err",err);
});