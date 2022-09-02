import pool from "../db.js";
import bcrypt from "bcrypt";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";
import TokenService from "./tokenService.js";

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

    const tokens = tokenService.generateTokens(userDto.id);

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
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
    const tokens = tokenService.generateTokens(userDto.id);

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
        user: userDto,
        tokens
    };
}

const signOut = async (refreshToken) => {
    await pool.query("DELETE FROM tokens WHERE refresh_token = $1", [refreshToken]);
    return {refreshToken};
}

export default {
    signUp,
    signIn,
    signOut
};
