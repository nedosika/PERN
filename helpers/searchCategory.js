import axios from "axios";

const searchCategory = (api, category) => {
    return axios(`${api}/categories?search=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data[0])
}

export default searchCategory;