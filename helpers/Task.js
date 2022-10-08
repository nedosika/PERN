import {updatePost} from "./updatePost.js";
import taskService from "../services/taskService.js";
import {wsServer} from "../index.js";

export default class Task {
    id
    api
    name
    start
    stop
    status = 'start'
    sitemap
    authorization
    timeout
    progress = 0
    titleRegExp
    errors = []
    posts = []

    constructor({id, api, name, sitemap = [], authorization, timeout = 0, titleRegExp}) {
        this.id = id;
        this.api = api;
        this.name = name;
        this.start = new Date();
        this.sitemap = sitemap;
        this.timeout = timeout;
        this.titleRegExp = titleRegExp;
        this.authorization = authorization;

        sitemap.reduce((p, url, index, arr) => p.then((prev) => {
            const {api, titleRegExp, authorization} = this;

            this.progress = Math.ceil((index + 1) * 100 / sitemap.length);
            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify({
                    event: 'update',
                    task: {
                        id,
                        name,
                        start: this.start,
                        status: this.status,
                        progress: this.progress,
                        errors: JSON.stringify(this.errors),
                        posts: this.posts
                    }
                }));
            });

            return updatePost({
                api,
                url,
                titleRegExp,
                authorization
            })
                .then((post) => {
                    this.posts.push(post);
                    return post;
                })
                .catch((error) => {
                    console.log(error.message);
                    this.errors.push({url, error: error.message});
                    return {error: error.message}
                })
        }), Promise.resolve()).finally(() => {
            this.status = 'complete';
            taskService.complete(this);
            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify({
                    event: 'update',
                    task: {
                        ...this,
                        stop: new Date(),
                        errors: JSON.stringify(this.errors),
                        posts: JSON.stringify(this.posts),
                        sitemap: JSON.stringify(this.sitemap)
                    }
                }));
            });
        });

        return this;
    }
}