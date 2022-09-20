import axios from "axios";
import {ERRORS} from "../consts.js";

export const fetchTitleFromPost = async ({
                                             url,
                                             regexp = '(?<=>)(.*)(?=</)',
                                             index = 0
                                         }) => {
    const results = await axios(url).then(({data}) => data.match(new RegExp(regexp)));
    const title = results[index];
    if (!title)
        throw new Error(ERRORS.title);
    return title;
}