import { ConnectDB, CookieSetller, GenerateToken } from "@/Utils/features";
import { Errorhandler, asyncError } from "@/middleware/error";
import { User } from "@/model/user";
import bcrypt from "bcrypt"


const Handler=asyncError(async (req,res)=>{

    if(req.method !=="POST"){
        return Errorhandler(res,400,"Only Post request Allowed !!")
     }

   const {name,email,password}=req.body;
   if( !name || !email || !password) return Errorhandler(res,400,"Please fill all the details");

    await ConnectDB();
    let user=await User.findOne({email})

    if(user) return Errorhandler(res,400,"Already Register User");

    const hashedPassword=await bcrypt.hash(password,10);   //to hash the password

    user=await User.create({name,email,password : hashedPassword});

   const token=GenerateToken(user._id);

   CookieSetller(res,token,true);

   res.status(201).json({
    success:true,
    message : "Register Successfully !!",
    user
   })
})


export default Handler;