import pool from "../db.js";
import Task from "../helpers/Task.js";

pool.query("UPDATE tasks SET status = $1, stop = $2 WHERE status = $3", ['aborted', new Date(), 'start']);

const getAll = () => pool.query("SELECT * FROM tasks");

const getById = (id) =>
    pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

const create = async ({api, name, timeout, titleRegExp, sitemap, authorization}) => {
    const result = await pool.query(
            "INSERT INTO tasks (name, status, start, timeout, title_search_fraze, sitemap, auth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, "start", new Date(), timeout, titleRegExp, JSON.stringify(sitemap), authorization]
        );

    return new Task({
        id: result.rows[0].id,
        authorization,
        api,
        name: name || api,
        timeout,
        titleRegExp,
        sitemap
    });
}

const remove = (id) =>
    pool.query("DELETE * FROM tasks WHERE id = $1", [id]);

const update = (name, status, stop) =>
    pool.query("UPDATE tasks SET name = $1, status = $2, stop = $3", [name, status, stop]);

const complete = ({id, posts, errors}) => pool.query(
    "UPDATE tasks SET status = $1, stop = $2, posts = $3, errors = $4 WHERE id = $5",
    ['complete', new Date(), JSON.stringify(posts), JSON.stringify(errors), id]
);

const stop = ({id}) =>
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