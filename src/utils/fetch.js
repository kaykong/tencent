// import {AxiosInstance as axios} from "axios";
import axios from "axios";

export const fetchGet = async (url, config) => {
    return axios.get(url, config).then(response => {
        return response.data
    }).catch(error => {
        return {
            status: 110,
            statusText: '网络连接异常'
        }
    })
}