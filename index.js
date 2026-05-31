import dotenv from "dotenv";
dotenv.config();

import express from  "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";

import employeeRouter from "./routes/employeeRouter.js"; 
import userRouter from "./routes/userRouter.js"; 

import cors from "cors";

import { authMiddleware } from "./middleware/authMiddleware.js"; 



// ======================================
// Express app 
// ======================================
const app = express();

// =================================================================================================
// CROSS Middleware 
// =================================================================================================
app.use(cors(
    {
        origin: "http://localhost:5173",  // allow all origins
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }   
));  

app.use(bodyParser.json());  


// =================================================================================================
// Authentication Middleware
// =================================================================================================
app.use(authMiddleware); 



// =================================================================================================
// MongoDB Database connection
// =================================================================================================
const mongoURL = process.env.MONGO_URL; 
mongoose.connect(mongoURL)
.then(()=>{
    console.log("connect to the data base")
}
).catch(()=>{
    console.log("database connection fail")
}
);


// ======================================
// Set Routes
// ======================================

app.use("/api/employees", employeeRouter);

app.use("/api/users", userRouter); 

// ====================================== 
// Server 
// ======================================
const port = process.env.PORT || 3000;

app.listen(port,()=>{
   console.log(`server is run on port ${port}`);
   }
);