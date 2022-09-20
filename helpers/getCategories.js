import trimChar from "./trimChar.js";

export default function getCategories(url) {
    const partedUrl = trimChar(url, '/').split('/');
    return partedUrl.length > 4 ? partedUrl.slice(3, -1) : [];
}