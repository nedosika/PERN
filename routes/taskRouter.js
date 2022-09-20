import Router from "express";
import tasksController from "../controllers/taskController.js";
import {body} from "express-validator";

const router = new Router();

router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.post(
    '/',
    body('authorization', 'Length must be at least 1 characters').isLength({min: 1}),
    body('sitemap', 'Must be an Array').isArray({min: 1}),
    body('api', 'Length must be at least 5 and no more 255 characters').isLength({min: 5, max: 255}),
    tasksController.createTask
);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.removeTask);

export default router;