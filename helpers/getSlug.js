import trimChar from "./trimChar.js";
import {ERRORS} from "../consts.js";

export default function getSlug(url){
    const partedUrl = trimChar(url, '/').split('/');
    const slug = partedUrl[partedUrl.length - 1];
    if(!slug)
        throw new Error(ERRORS.slug)
    return slug;
}