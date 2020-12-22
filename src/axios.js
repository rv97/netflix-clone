import axios from 'axios';

//Base url for the API calls
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;