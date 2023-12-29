import { serialize } from "cookie";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { User } from "@/model/user";


export const ConnectDB=async()=>{
    const {connection}=await mongoose.connect(process.env.MONGO_URI,{
        dbName:"TodoApp"
    })
    console.log(`connected to ${connection.host}`);
};

export const CookieSetller=(res,token,set)=>{
     
    res.setHeader("Set-Cookie",serialize("token",set ? token : " ",{
        path:"/",
        httpOnly : true,
        maxAge: set ? 10*24*60*60*1000 : 0
    }))
}

export const GenerateToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET)
}


export const VerifyToken = async (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) return null;
  
    const token = cookie.split("=")[1];
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    return await User.findById(decoded._id);
  };



