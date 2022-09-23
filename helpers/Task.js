import {updatePost} from "./updatePost.js";
import taskService from "../services/taskService.js";
import {wsServer} from "../index.js";

export default class Task {
    id
    api
    status = 'start'
    sitemap
    authorization
    timeout
    progress = 0
    titleRegExp
    errors = []
    posts = []

    constructor({id, api, sitemap = [], authorization, timeout = 0, titleRegExp}) {
        this.id = id;
        this.api = api;
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
                            id: this.id,
                            status: this.status,
                            progress: index,
                            errors: this.errors,
                            addedPosts: this.posts.length
                        }));
                    });
                    this.progress = index;
                })
        }), Promise.resolve()).finally(() => {
            console.log('complete');
            taskService.complete(this);
            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify({
                    id: this.id,
                    status: 'complete',
                    progress: this.progress,
                    errors: this.errors,
                    addedPosts: this.posts.length
                }));
            });
        })

        return this;
    }
}