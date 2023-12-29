import { ConnectDB, CookieSetller, GenerateToken } from "@/Utils/features";
import { Errorhandler, asyncError } from "@/middleware/error";
import { User } from "@/model/user";
import bcrypt from "bcrypt"


const Handler=asyncError(async (req,res)=>{

    if(req.method !=="POST"){
        return Errorhandler(res,400,"Only Post request Allowed !!")
     }

   const {email,password}=req.body;
   if( !email || !password) return Errorhandler(res,400,"Please fill all the details");

    await ConnectDB();
    const user=await User.findOne({email}).select("+password");   //to check password as well as in schema we made select false for password
    
    if(!user) return Errorhandler(res,400,"Invalid UserName or password ");

    const isMatch=await bcrypt.compare(password,user.password);   //to match the hash password
    if(!isMatch) return Errorhandler(res,400,"Invalid UserName or password ");

   const token=GenerateToken(user._id);

   CookieSetller(res,token,true);

   res.status(200).json({
    success: true,
    message : `Welcome back, ${user.name}`,
    user
   })
})


export default Handler;