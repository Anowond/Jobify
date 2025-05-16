import axios from "axios";

const customAxios = axios.create({
    baseURL: '/api'
})

export default customAxios