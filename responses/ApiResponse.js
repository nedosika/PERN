export default function ApiResponse({response, status = 201, message = '', data = {}, errors = []}){
    console.log({
        message,
        data,
        errors,
        status
    })
    return response.status(status).json({
        message,
        data,
        errors,
        status
    });
}