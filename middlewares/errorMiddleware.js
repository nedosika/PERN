import ApiError from "../exceptions/ApiError.js";
import ApiResponse from "../responses/ApiResponse.js";

export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return ApiResponse({response: res, status: err.status, message: err.message, errors: err.errors});
    }
    return ApiResponse({response: res, status: 500, message: 'Unknown error', errors: [{msg: 'Unknown error'}]})
};