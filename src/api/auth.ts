import client from './request'

// 登录方法
export function login(username, password, grant_type) {
    const data = {
        username,
        password,
        grant_type
    }
    return client.post('/api/auth/login', data)
}

export function register(username, password, email, mobile, captcha) {
    const data = {
        username, password, email, mobile, captcha
    }
    console.log(data)
    return client.post('/api/auth/register', data)
}
