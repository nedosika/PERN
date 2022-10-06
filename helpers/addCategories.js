import axios from "axios";
import searchCategory from "./searchCategory.js";

const addCategory = ({api, name, parent, authorization}) => {

    return axios(`${api}/categories`, {
        method: 'POST',
        data: JSON.stringify({name, parent}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + authorization
        }
    }).then(res => res.data)
}

const addCategories = async ({api, categories, authorization}) => {
    if(!categories)
        return;

    const result = [];

    await categories.reduce(
        (p, category) => p.then(async (parentId = 0) => {
            try {
                const categoryCandidate = await searchCategory(api, category);
                const resultCategory = categoryCandidate
                    ? categoryCandidate
                    : await addCategory({api, name: category, parent: parentId, authorization});
                result.push(resultCategory.id);
                return resultCategory.id;
            } catch (error) {
                console.log(error.message);
            }
        }),
        Promise.resolve()
    );

    return {categories: result.slice(-1)}
}

export default addCategories;