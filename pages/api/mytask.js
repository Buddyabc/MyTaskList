import { ConnectDB, VerifyToken } from "@/Utils/features"
import { Errorhandler, asyncError } from "@/middleware/error";
import { Task } from "@/model/task";


//to show created task 

const handler=asyncError(async(req,res)=>{
    if(req.method !=="GET"){
       return Errorhandler(res,400,"Only GET request Allowed !!")
    }
    await ConnectDB();

    const user = await VerifyToken(req);

  if (!user) return Errorhandler(res, 401, "Login First");

  const tasks = await Task.find({ user: user._id });

  res.json({
    success: true,
    tasks,
  });
})

export default handler;