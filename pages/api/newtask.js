import { ConnectDB, VerifyToken } from "@/Utils/features"
import { Errorhandler, asyncError } from "@/middleware/error";
import { Task } from "@/model/task";



const handler=asyncError(async(req,res)=>{
    if(req.method !=="POST"){
       return Errorhandler(res,400,"Only Post request Allowed !!")
    }
    await ConnectDB();

    const {title,description}=req.body;
    if (!title || !description)
    return Errorhandler(res, 400, "Please Enter All fields");

  const user = await VerifyToken(req);

  if (!user) return Errorhandler(res, 401, "Login First");

    await Task.create({
        title,
        description,
        user: user._id
    })
    res.status(201).json({
        success : true,
        message:"Task Created !!",
        user
    })
})

export default handler;