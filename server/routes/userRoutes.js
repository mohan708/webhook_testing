import express from "express";
import { userLogin } from "../controller/userController.js";
import { userRegister } from "../controller/userController.js";
import uploadResume from "../config/multer.js";
import { uploadUserResume } from "../controller/userController.js";
import { protectUser } from "../middleware/protectUser.js";


const router = express.Router();




 router.post("/register",userRegister)
 
 router.post("/login",userLogin)

//  upload resume
  
router.post("/uploadResume", protectUser, uploadResume.single('resume'),uploadUserResume )

export default router