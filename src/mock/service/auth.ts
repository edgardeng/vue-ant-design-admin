// -------- Mock Service For Auth APIs
import { Random } from 'mockjs';

export default [
    {
        url: '/api/auth/login',
        method: 'post',
        response: (options: any) => {
            let body = options.body || JSON.parse(options.body)
            if (!['admin', 'test'].includes(body.username) || body.password != 'e10adc3949ba59abbe56e057f20f883e') {
                return {
                    err_code: 1,
                    err_msg: '用户名或密码错误',
                    username: body.username,
                    password: body.password
                }
            }
            return {
                err_code: 0,
                data: {
                    id: body.username == 'admin' ? 1 : 2,
                    username: body.username,
                    role: body.username == 'admin' ? 'admin' : 'user'
                },
            };
        },
    },
    {
        url: '/api/auth/register',
        method: 'post',
        timeout: 1000,
        response: {
            err_code: 0, data: {id: 3},
        },
    },
    {
        url: '/api/auth/captcha',
        method: 'get',
        response: {
            err_code: 0, data: Random.image('100x38', Random.color(), Random.color(), Random.title(),'1234')
        },
        // response: {
        //     pic: Random.dataImage('120*40','1234'),
        //     // pic: Random.image('800x600', Random.color(), Random.color(), Random.title())
        // }
        // rawResponse: async (req:any, resL:any) => {
        //    return Random.dataImage('120*40','1234')
        // },
    },
    {
        url: '/api/auth/captcha2',
        method: 'get',
        rawResponse: async (req:any, res:any) => {
            let reqbody = '';
            await new Promise((resolve) => {
                req.on('data', (chunk:any) => {
                    reqbody += chunk;
                });
                req.on('end', () => resolve(undefined));
            });
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            res.end(`hello, ${reqbody}`);
        },
    },
]