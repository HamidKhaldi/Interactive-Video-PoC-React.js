import axios from 'axios';

const BackEndClient = axios.create({
    baseURL: 'siteUrl/',
    timeout: 1000,
    headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json',
    }
});


export default BackEndClient;
