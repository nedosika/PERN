import axios from "axios";
import {ERRORS} from "../consts.js";

export const searchPostId = async ({api, search, isStrongSearch}) => {
    const id = await axios(encodeURI(`${api}/posts/?search=${search}`))
        .then(res => isStrongSearch
            ? res.data.filter(({title}) => search === title.rendered)[0]?.id
            : res.data[0]?.id
        )
    if (!id)
        throw new Error(ERRORS.post);

    return id
}