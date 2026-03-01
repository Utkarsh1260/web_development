require('dotenv').config();
const mongoose=require('mongoose');


// //mongodb connection url - using local MongoDB
//const mongoURL=process.env.MONGODB_URL_LOCAL

//connecting to local mongodb server for development
 const mongoURL=process.env.MONGODB_URL


//set up mongodb connection
mongoose.connect(mongoURL);

//maiting default connection object
const db=mongoose.connection;

db.on('connected', () =>{
    console.log("Connected to mongodb server successfully");
})


db.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

//exporting mongodb connection
module.exports=db;