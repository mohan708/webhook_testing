import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import { clerkWebhooks } from "./controller/webhook.js";

import userRoutes from "./routes/userRoutes.js";




const app = express();

// Webhook route BEFORE json parser to get raw body
app.post('/webhooks', express.raw({type: 'application/json', limit: '5mb'}), clerkWebhooks)

app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

console.log(process.env.CLERK_WEBHOOK_SECRET_KEY)

app.get("/", (req,res)=>{
    res.send("server is runnig");
})

app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})