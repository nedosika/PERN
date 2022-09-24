import {updatePost} from "./updatePost.js";
import taskService from "../services/taskService.js";
import {wsServer} from "../index.js";

export default class Task {
    id
    api
    name
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
        this.sitemap = sitemap;
        this.timeout = timeout;
        this.titleRegExp = titleRegExp;
        this.authorization = authorization;

        sitemap.reduce((p, url, index, arr) => p.then((prev) => {
            const {api, titleRegExp, authorization} = this;

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
                    this.errors.push(error.message);
                    return {error: error.message}
                })
                .finally(() => {
                    wsServer.clients.forEach((client) => {
                        client.send(JSON.stringify({
                            event: 'update',
                            task: {
                                id,
                                name,
                                status: this.status,
                                progress: index,
                                errors: this.errors,
                                addedPosts: this.posts.length
                            }
                        }));
                    });
                    this.progress = index;
                })
        }), Promise.resolve()).finally(() => {
            this.status = 'complete'
            taskService.complete(this);
            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify({
                    event: 'update',
                    task: {
                        id,
                        name,
                        status: this.status,
                        progress: this.progress,
                        errors: this.errors,
                        addedPosts: this.posts.length
                    }
                }));
            });
        })

        return this;
    }
}