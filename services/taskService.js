import pool from "../db.js";

const getAll = () =>
    pool.query("SELECT * FROM tasks");

const getById = (id) =>
    pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

const create = ({name}) =>
    pool.query("INSERT INTO tasks (name, status, start) VALUES ($1, $2, $3) RETURNING *", [name,  "work", new Date()]);

const remove = (id) =>
    pool.query("DELETE * FROM tasks WHERE id = $1", [id]);

const update = (name, status, stop) =>
    pool.query("UPDATE tasks SET name = $1, status = $2, stop = $3", [name, status, stop]);

const complete = ({id, posts, errors}) =>
    pool.query("UPDATE tasks SET status = $1, stop = $2 WHERE id = $3", ['complete', new Date(), id]);

const stop = ({id, description, posts, errors}) =>
    pool.query("UPDATE tasks SET status = $1, stop = $2 WHERE id = $3", ['stopped', new Date(), id]);

export default {
    getAll,
    getById,
    create,
    remove,
    update,
    complete,
    stop
}