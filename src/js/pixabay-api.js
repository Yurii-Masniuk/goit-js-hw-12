import axios from "axios";

const API_KEY = '51729015-e356512e01098e6cfb5d1c735';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    };
    return axios.get(BASE_URL, { params }).then(response => response.data,);
};