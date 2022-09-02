import {cookie, validationResult} from 'express-validator';
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

        const data = await UserService.signUp(email, password, name);

        data.tokens && res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return new ApiResponse({response: res, data});
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const data = await UserService.signIn(email, password);
        res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return new ApiResponse({response: res, data})
    } catch (e) {
        next(e);
    }
}

const signOut = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const data = await UserService.signOut(refreshToken);
        res.clearCookie('refreshToken');
        return new ApiResponse({response: res, data, message: 'Sign out complete'});
    } catch (e) {
        next(e);
    }
}

const refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const data = await UserService.refresh(refreshToken);
        res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return new ApiResponse({response: res, data})
    } catch (e) {
        next(e);
    }
}

export default {
    signUp,
    signIn,
    signOut,
    refresh
}