import dotenv from 'dotenv'
// import cors from 'cors';
import connectDB from "./config/mongo.db.config";
import express from 'express';
import authRoutes from './routes/auth.route'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});

export default app;


//pass  laithalskaf   B6a0pzdGluwoOpsy