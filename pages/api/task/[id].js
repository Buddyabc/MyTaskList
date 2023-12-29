import { ConnectDB, VerifyToken } from "@/Utils/features";
import { Errorhandler, asyncError } from "@/middleware/error";
import { Task } from "@/model/task";


const handler = asyncError(async (req, res) => {
  await ConnectDB();
  const user = await VerifyToken(req);
  if (!user) return Errorhandler(res, 401, "Login First");

  const taskId = req.query.id;

  const task = await Task.findById(taskId);

  if (!task) return Errorhandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    Errorhandler(res, 400, "This method is not available");
  }
});

export default handler;