import {  CookieSetller } from "@/Utils/features";
import { Errorhandler, asyncError } from "@/middleware/error";



const Handler=asyncError(async (req,res)=>{

    if(req.method !=="GET"){
        return Errorhandler(res,400,"Only GET request Allowed !!")
     }

   CookieSetller(res,null,false);  // delete previous make cookie as well

   res.status(200).json({
    success: true,
    message : "Log out successfully"
   })
})


export default Handler;