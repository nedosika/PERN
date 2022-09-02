import pool from "../db.js";
import bcrypt from "bcrypt";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

const getOne = () => {

}

const getOneByToken = () => {

}

const getOneByEmail = () => {

}

const update = () => {

}

const signIn = async (email, password) => {

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
    const tokens = tokenService.generateTokens(newUser.rows[0].user_id);

    return {
        user: new UserDto(newUser.rows[0]),
        tokens
    };
}

const signOut = () => {

}

const refreshToken = () => {

}

export default {
    signUp
};
