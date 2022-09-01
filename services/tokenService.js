import jwt from "jsonwebtoken";
import config, {TOKEN_TYPES} from "../config.js";

const generateTokens = ({id}) => {
    const accessToken = jwt.sign(
        {user: {id}},
        config.JWT_ACCESS_SECRET_PHRASE,
        {expiresIn: '1d'}
    );

    const refreshToken = jwt.sign(
        {user: {id}},
        config.JWT_REFRESH_SECRET_PHRASE,
        {expiresIn: '30d'}
    );

    return {
        accessToken,
        refreshToken
    }
}

const validateToken = ({token, secretPhrase}) => {
    try {
        return jwt.verify(token, secretPhrase)
    } catch (error) {
        return null;
    }
}

const saveToken = async (userId, refreshToken) => {
    // const tokenData = await tokenModel.findOne({user: userId})
    // if (tokenData) {
    //     tokenData.refreshToken = refreshToken;
    //     return tokenData.save();
    // }
    // const token = await tokenModel.create({user: userId, refreshToken})
    // return token;
}

const removeToken = async (refreshToken) => {
    // const tokenData = await tokenModel.deleteOne({refreshToken})
    // return tokenData;
}

const findToken = async (refreshToken) => {
    // const tokenData = await tokenModel.findOne({refreshToken})
    // return tokenData;
}

export default {
    generateTokens,
    validateToken,
    removeToken,
    findToken,
    saveToken
}