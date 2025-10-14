import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js";
import userRouter from "./routes/UserRouter.js";
import ownerRouter from "./routes/ownerRoutes.js";

// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// connect database 
await connectDB()

// Middleware
app.use(cors());
app.use(express.json());




// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/user' , userRouter)
app.use('/api/owner' , ownerRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
