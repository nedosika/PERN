import pool from "../db.js";
import bcrypt from "bcrypt";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";
import config from "../config.js";

const signIn = async (email, password) => {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (!user.rows.length) {
        throw ApiError.BadRequest('Invalid Credential', [{msg: 'Invalid Credential'}]);
    }

    const isPassEquals = await bcrypt.compare(password, user.rows[0].user_password);

    if (!isPassEquals) {
        throw ApiError.BadRequest('Invalid Credential', [{msg: 'Invalid Credential'}])
    }

    const userDto = new UserDto(user.rows[0]);

    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto, tokens.refreshToken);
    return {...tokens, user: userDto}
}

const signUp = async (email, password, name) => {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length)
        throw ApiError.AlreadyExist();

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
    );
    const userDto = new UserDto(newUser.rows[0]);
    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto, tokens.refreshToken);

    return {
        user: userDto,
        tokens
    };
}

const signOut = async (refreshToken) => {
    const tokenData = await pool.query("DELETE FROM tokens WHERE refresh_token = $1", [refreshToken]);
    return tokenData.rowCount ? {refreshToken} : {};
}

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const tokenData = tokenService.validateToken(refreshToken, config.JWT_REFRESH_SECRET_PHRASE);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!tokenData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const userData = await pool.query("SELECT * FROM users WHERE user_id = $1", [tokenData.id]);

    const userDto = new UserDto(userData.rows[0]);
    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto, tokens.refreshToken);
    return {...tokens, user: userDto}
}

export default {
    signUp,
    signIn,
    signOut,
    refresh
};
