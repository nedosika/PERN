import Router from "express";
import {body} from 'express-validator';
import userController from "../controllers/userController.js";

export const USER_PATHS = {
    signUp: '/signup',
    signIn: '/signin',
    signOut: '/signout'
};

const router = new Router();

router.post(
    USER_PATHS.signUp,
    body('email', 'Must be email').isEmail(),
    body('password', 'Length must be at least 3 and no more 32 characters').isLength({min: 3, max: 32}),
    userController.signUp
);

router.post(
    USER_PATHS.signIn,
    userController.signIn
)

router.post(
    USER_PATHS.signOut,
    userController.signOut
)

export default router;