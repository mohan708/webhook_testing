import user from "../model/user.js";
import generateToken from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";



// user register
export const userRegister = async (req, res) => {

    const { name, email, image, resume, _id, password } = req.body;

    try {

        const data = await user.findOne({ email })



        if (data) {
            return res.json({ success: false, message: "user is already exists in db" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await user.create({
            name,
            email,
            image,
            resume,
            password: hash,
            _id
        })

        res.json({
            success: true,
            message: "user registered successfully",
            token: generateToken(newUser._id),
            newUser
        })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

// user login

export const userLogin = async (req, res) => {

    const { name, email, image, resume, id, password } = req.body;

    try {

        const data = await user.findOne({ email })

        if (data) {

            if (await bcrypt.compare(password, data.password)) {
                res.json({
                    success: true, message: "login sucessfully",
                    token: generateToken(data._id),
                    data
                })

            }
            else {
                return res.json({ success: false, message: "incorrect password" })
            }


        }
        else {
            return res.json({
                success: false,

                message: "user does not exists in db"
            })
        }



    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// upload resume to cloudinary

export const uploadUserResume = async (req, res) => {

    const file = req.file;
    const userId = req.userId;

    try {

        if (!file) {
            return res.json({ success: false, message: "no file uploaded" })
        }

         // 🔥 check userId
         if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
   

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "resumes",
                resource_type: "raw",// IMPORTANT for PDF/DOC
                format: "pdf",

            })
           

       const data =  await user.findById(userId)

       if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

       data.resume = result.secure_url
         await data.save()

         res.json({
            success: true,
            message: "resume uploaded successfully",
            resume: result.secure_url
         })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}