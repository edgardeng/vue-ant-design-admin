import client from './request'

// 登录方法
export function login(username:string, password:string, grant_type='password') {
    const data = {
        username,
        password,
        grant_type
    }
    return client.post('/api/auth/login', data)
}

export function register(username:string, password:string, email:string, mobile:string, captcha:string) {
    const data = {
        username, password, email, mobile, captcha
    }
    console.log(data)
    return client.post('/api/auth/register', data)
}

export function captcha() {
    return client.get('/api/auth/captcha')
}

