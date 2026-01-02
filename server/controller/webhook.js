import { Webhook } from "svix";
import User from "../model/user.js";

// Api Controller function to Manage clerk user with database

export const clerkWebhooks = async (req,res)=>{

    console.log("🟢 Received Clerk webhook");
    console.log("req.body type:", typeof req.body);
    console.log("req.body:", req.body);

    try {
        // create a svik instance with clerk webhook secret.

         const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET_KEY)
        
        if (!req.body) {
            throw new Error("Request body is undefined");
        }

        // Convert buffer to string if needed
        const payload = typeof req.body === 'string' ? req.body : req.body.toString("utf8");
        console.log("Payload:", payload);

        const evt = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = evt;

        

        // console.log("🟢 Incoming webhook event:", req.body);
        // console.log("🟢 Incoming webhook event:", data);
        // console.log("🟢 Incoming webhook event:", type);


    console.log("✅ Clerk webhook verified:", type);

        // Switch case for different events

        switch(type){
            case 'user.created': {

                const userData = {
                    _id:data.id,
                     email: data.email_addresses[0].email_address,
                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    image: data.image_url,
                    resume: "",
                }

                await User.create(userData)
                res.json({})
                    break;
                

            }

            case "user.updated":{

                 const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break

            }

            case "user.deleted" :{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
        }

    } catch (error) {
        // verifying headers 
        res.json({success:false, message: error.message })
       
         
    }

}

