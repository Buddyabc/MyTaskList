import {  VerifyToken } from "@/Utils/features";
import { Errorhandler, asyncError } from "@/middleware/error";

const Handler=asyncError(async (req,res)=>{

    if(req.method !=="GET"){
        return Errorhandler(res,400,"Only GET request Allowed !!")
     }

    const user=await VerifyToken(req);
    if(!user) return Errorhandler(res,400,"Invalid UserName or password ");

   res.status(200).json({
    success: true,
    user
   })
})


export default Handler;