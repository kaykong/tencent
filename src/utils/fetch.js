// import {AxiosInstance as axios} from "axios";
import axios from "axios";
axios.defaults.baseURL = 'https://service-6qcrvxv3-1305383279.sh.apigw.tencentcs.com'

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