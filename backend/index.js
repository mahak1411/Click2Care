import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import PatientRoute from './routes/PatientRoute.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import path from 'path'
// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

const _dirname = path.resolve()

// Middleware
app.use(express.json());
app.use(cors());


app.use("/api/symptoms", symptomRoutes);
app.use('/api/auth',PatientRoute)
app.use('/api/storage',prescriptionRoutes)

app.use(express.static(path.join(_dirname , "/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"))
})

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
