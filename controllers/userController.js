import UserService from "../services/userService.js";

const signUp = async (req, res) => {
    try {
        const {email, password, name} = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                message: "All input is required",
                status: "Error",
                code: 400
            });
        }

        const data =  await UserService.signUp(email, password, name);
        data.tokens && res.cookie('refreshToken', data.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.status(data.code).json(data);
    } catch (err) {
        return res.status(409).json({
            message: err.message,
            status: "Error",
            code: 409
        });
    }
};

export default {
    signUp
}