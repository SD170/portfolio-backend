import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/connection";

//load env vars
dotenv.config({path: __dirname+'/../config.env'});

//Connect to database
connectDB();

//route files
import projectRoutes from "./routes/project.route";
import authRoutes from "./routes/auth.route";





const app = express();


//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//dev logging middleware
if(process.env.NODE_ENV==='development'){   //only when using dev env
    app.use(morgan('dev'));
}


//mount routers
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);




const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
});

