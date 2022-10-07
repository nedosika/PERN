import ApiResponse from "../responses/ApiResponse.js";
import taskService from "../services/taskService.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/ApiError.js";

const getAllTasks = async (req, res, next) => {
    try {
        const {rows: data} = await taskService.getAll();

        return new ApiResponse({response: res, data});
    } catch (error) {
        next(error);
    }
}

const getTaskById = async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', validation.errors))
        }

        const {id} = req.body;

        const {rows} = await taskService.getById(id);

        return new ApiResponse({
            response: res, data: rows[0]
        });
    } catch (error) {
        next(error);
    }
}

const createTask = async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', validation.errors))
        }

        const {name, api, authorization, sitemap = [], timeout = 0, titleRegExp} = req.body;

        const result = await taskService.create({
            name: name || api,
            api,
            timeout,
            titleRegExp,
            sitemap,
            authorization
        });

        return new ApiResponse({response: res, data: result});
    } catch (error) {
        next(error);
    }
}

const removeTask = async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', validation.errors))
        }

        const {id} = req.body;

        const data = await taskService.remove(id);

        return new ApiResponse({
            response: res, data: {
                tasks: data.rows
            }
        });
    } catch (error) {
        next(error);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', validation.errors))
        }

        const {name, stop, status} = req.body;

        const data = await taskService.update(name, status, stop);

        return new ApiResponse({
            response: res, data: {
                tasks: data.rows
            }
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    removeTask,
    updateTask
};