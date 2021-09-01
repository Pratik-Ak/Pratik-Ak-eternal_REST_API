//---INITIALIZING AND IMPORTING MODULES---//
const express = require('express');   
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser= require('body-parser');
const joi = require('joi');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes')

dotEnv.config();            //Configuration of dotenv.
const app = express();      
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));





//---MONGOOSE DB CODE---//
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('MONGO-DB SERVER IS CONNECTED...'));

mongoose.connection.on('error',err=>{
    console.log("----*-------*---------*----------*-----------*---------*-----------*----")

    console.log(`MONGO-DB SERVER CONNECTION ERROR: ${err.message}`)
})


//---CONTENT---//

app.use('/',userRouter);



//---SERVER CONNECTION---//
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`>>>>>>>>>> NODEJS API SERVER IS CONNECTED TO PORT: ${PORT} <<<<<<<<<<`);
    console.log("------------------------------------------------------------------")
});

