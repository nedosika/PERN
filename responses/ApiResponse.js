export default function ApiResponse({response, status = 201, message = '', data = {}, errors = []}){
    return response.status(status).json({
        message,
        data,
        errors,
        status
    });
}