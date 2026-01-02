import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import { clerkWebhooks } from "./controller/webhook.js";

import userRoutes from "./routes/userRoutes.js";




const app = express();


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

const PORT = 5050;

await connectDb();

app.use(express.json());



app.get("/", (req,res)=>{
    res.send("server is runnig");
})

app.post('/webhooks',clerkWebhooks)

app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})