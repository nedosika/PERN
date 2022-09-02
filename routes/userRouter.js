import Router from "express";
import {body} from 'express-validator';
import userController from "../controllers/userController.js";

export const USER_PATHS = {
    signUp: '/signup'
};

const router = new Router();

router.post(
    USER_PATHS.signUp,
    body('email', 'Must be email').isEmail(),
    body('password', 'Length must be at least 3 and no more 32 characters').isLength({min: 3, max: 32}),
    userController.signUp
);

export default router;