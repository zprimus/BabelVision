import axios from 'axios';
import {API_NLP_URL, API_NLP_KEY, API_NLP_HOST} from '@env'; 

// api for http requests
export default axios.create({
    baseURL: API_NLP_URL,
    headers: {
        'x-rapidapi-key': API_NLP_KEY,
        'x-rapidapi-host': API_NLP_HOST
    }
});