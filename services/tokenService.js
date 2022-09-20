import jwt from "jsonwebtoken";
import config from "../config.js";
import pool from "../db.js";

const generateTokens = ({id}) => {
    const accessToken = jwt.sign(
        {id},
        config.JWT_ACCESS_SECRET_PHRASE,
        {expiresIn: '1d'}
    );

    const refreshToken = jwt.sign(
        {id},
        config.JWT_REFRESH_SECRET_PHRASE,
        {expiresIn: '30d'}
    );

    return {
        accessToken,
        refreshToken
    }
}

const validateToken = (token, secretPhrase) =>{
    try {
        return jwt.verify(token, secretPhrase);
    } catch (error) {
        return null;
    }
}

const saveToken = async ({id}, refreshToken) => {
    const tokenData = await pool.query("SELECT * FROM tokens WHERE user_id = $1", [id]);

    if (tokenData.rows.length) {
        return await pool.query("UPDATE tokens SET refresh_token = $1 WHERE user_id = $2", [refreshToken, id]);
    }

    return await pool.query("INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2)", [id, refreshToken])
}

const removeToken = (refreshToken) =>
    pool.query("DELETE FROM tokens WHERE refreshToken = $1", [refreshToken]);

const findToken = (refreshToken) =>
    pool.query("SELECT * FROM tokens WHERE refresh_token = $1", [refreshToken]);

export default {
    generateTokens,
    validateToken,
    removeToken,
    findToken,
    saveToken
}