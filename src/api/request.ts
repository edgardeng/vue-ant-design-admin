import axios from 'axios'
// import store from '@/store'
// import storage from 'store'
import notification from 'ant-design-vue/es/notification'
// import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const client = axios.create({
    // API 请求的默认前缀
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:any) => {
    if (error.response) {
        console.log(error.response)
        const data = error.response.data
        // 从 localstorage 获取 token
        // const token = storage.get(ACCESS_TOKEN)
        // if (error.response.status === 403) {
        //     notification.error({
        //         message: 'Forbidden',
        //         description: data.message
        //     })
        // }
        // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
        //     notification.error({
        //         message: 'Unauthorized',
        //         description: 'Authorization verification failed'
        //     })
        //     if (token) {
        //         store.dispatch('Logout').then(() => {
        //             setTimeout(() => {
        //                 window.location.reload()
        //             }, 1500)
        //         })
        //     }
        // }
    } else {
        console.log(error)
    }
    return Promise.reject(error)
}

// request interceptor
client.interceptors.request.use(config => {
    // const token = storage.get(ACCESS_TOKEN)
    // // 如果 token 存在
    // // 让每个请求携带自定义 token 请根据实际情况自行修改
    // if (token) {
    //     config.headers['Access-Token'] = token
    // }
    return config
}, errorHandler)

// response interceptor
client.interceptors.response.use((response) => {
    // console.log(response.data)
    var data = response.data
    if (data && data.err_code !== 0) {
        notification.error({
            message: '错误',
            description: data.err_msg ? data.err_msg : '未知错误'
        })
        return Promise.reject(new Error(''))
    }
    return response.data
}, errorHandler)



export default client

