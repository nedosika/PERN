export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Authorization Error', [{msg: 'User not authorized'}])
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static AlreadyExist() {
        return new ApiError(403, 'User Error', [{msg: 'User already exist'}]);
    }
}