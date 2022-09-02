import jwt from "jsonwebtoken";
import config, {TOKEN_TYPES} from "../config.js";
import pool from "../db.js";

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
        return jwt.verify(token, secretPhrase);
    } catch (error) {
        return null;
    }
}

const saveToken = async (userId, refreshToken) => {
    const tokenData = await pool.query("SELECT * FROM tokens WHERE user_id = $1", [userId]);

    if (tokenData.rows.length) {
        return await pool.query("UPDATE tokens SET refresh_token = $1 WHERE user_id = $2", [refreshToken, userId]);
    }

    return await pool.query("INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2)", [userId, refreshToken])
}

const removeToken = async (refreshToken) => {
    return await pool.query("DELETE FROM tokens WHERE refreshToken = $1", [refreshToken]);
}

const findToken = async (refreshToken) => {
    return await pool.query("SELECT * FROM tokens WHERE refresh_token = $1", [refreshToken]);
}

export default {
    generateTokens,
    validateToken,
    removeToken,
    findToken,
    saveToken
}