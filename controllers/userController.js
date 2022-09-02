import {validationResult} from 'express-validator';
import UserService from "../services/userService.js";
import ApiError from "../exceptions/ApiError.js";
import ApiResponse from "../responses/ApiResponse.js";

const signUp = async (req, res, next) => {
    try {
        const validation  = validationResult(req);

        if(!validation.isEmpty()){
            return next(ApiError.BadRequest('Validation error', validation.errors))
        }

        const {email, password, name} = req.body;

        const userData = await UserService.signUp(email, password, name);

        userData.tokens && res.cookie('refreshToken', userData.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return new ApiResponse({response: res, data: userData});
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await UserService.signIn(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return new ApiResponse({response: res, data: userData})
    } catch (e) {
        next(e);
    }
}

export default {
    signUp,
    signIn
}