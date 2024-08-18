import express from "express";
import commandRoute from "./routes/commandRoute";
import { connectDB } from "./database";
import dotenv from 'dotenv'

const app = express();

dotenv.config()

app.use(express.json());
app.use("/api", commandRoute);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

