import { Webhook } from "svix";
import User from "../model/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Empty body" });
    }

    const payload = req.body.toString("utf8");

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

    const evt = wh.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created":
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });

        break;
      }

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    return res.status(200).json({ success: true , message: "sucess"});
  } catch (error) {
    console.error("❌ Clerk webhook error:", );
    return res.status(400).json({ success: false, message: error.message });
  }
};
