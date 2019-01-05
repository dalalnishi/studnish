import axios from 'axios';

export const baseurl="http://localhost:3002";

const baseService=axios.create({
    baseURL: baseurl
});

export default baseService;