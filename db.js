const mongoose=require('mongoose');
require("dotenv").config();
//define the mongodb connection url
const mongoURL=process.env.MONGODB_URL_LOCAL //hotels is name of our database,name can be anything

//set up mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//get the default connection
//mongoose maintains default connection object representing mongodb connection
const db=mongoose.connection;

//define event listeners for database connection
//all these connected,error,disconnected are not defined by us ye mongodb apne ap samajhta h 
db.on('connected',()=>{
    console.log('Connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
});

//export database connection
module.exports=db;
