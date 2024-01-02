import axios from 'axios';

const BackEndClient = axios.create({
    baseURL: 'https://eygb.sharepoint.com/sites/WireWaxPoC/_api/web/lists/',
    timeout: 1000,
    headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json',
    }
});


export default BackEndClient;
