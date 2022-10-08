import axios from "axios";
import getSlug from "./getSlug.js";
import getCategories from "./getCategories.js";
import {fetchTitleFromPost} from "./fetchTitleFromPost.js";
import {searchPostId} from "./searchPostId.js";
import addCategories from "./addCategories.js";
import {delay} from "./delay.js";

export const updatePost = async ({
                                     api,
                                     authorization,
                                     titleRegExp,
                                     regExpIndex,
                                     isStrongSearch = false,
                                     url
}) => {
    //console.log(authorization);
    //console.log(url)
    //await delay(5000)
    const slug = getSlug(url);
    //console.log(slug)
    const categories = getCategories(url);
    //console.log(categories)
    const title = await fetchTitleFromPost({url, regexp: titleRegExp, index: regExpIndex});
    //console.log(title)
    const id = await searchPostId({api, search: title, isStrongSearch});
    //console.log(id)
    const data = JSON.stringify(Object.assign(
        {slug: slug.replace('.html', '')},
        await addCategories({api, categories, authorization})
    ))
    //console.log(data);

    return axios(`${api}/posts/${id}`, {
        method: 'PUT',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + authorization
        }
    }).then(({data}) => data)
}