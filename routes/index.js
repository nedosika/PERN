import Router from "express";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";

const router = new Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter)

export default router;