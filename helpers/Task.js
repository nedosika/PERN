import {updatePost} from "./updatePost.js";
import taskService from "../services/taskService.js";

export default class Task{
    id
    api
    sitemap
    authorization
    timeout
    progress
    titleRegExp
    errors
    posts

    constructor({id, api, sitemap = [], authorization, timeout = 0, progress = 0, titleRegExp}) {
        this.id = id;
        this.api = api;
        this.posts = [];
        this.errors = [];
        this.sitemap = sitemap;
        this.timeout = timeout;
        this.progress = progress;
        this.authorization = authorization;
        this.titleRegExp = titleRegExp;

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
                    this.progress = index;
                })
        }), Promise.resolve()).finally(() => {
            console.log('complete');
            taskService.complete(this);
        })

        return this;
    }
}