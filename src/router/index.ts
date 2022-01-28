import {createRouter, createWebHistory} from 'vue-router'
//import type {RouteRecordRaw, RouteMeta} from 'vue-router';
// import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import {useStore} from 'vuex'
// const store = useStore()
import store from '../store/index'
const AuthLayout = () => import('/@/views/auth/index.vue');

const routes = [
    {path: '/', component: () => import('/@/views/home/index.vue')},
    {
        path: '/auth',
        component: AuthLayout,
        redirect: '/auth/login',
        hidden: true,
        children: [
            {
                path: '/auth/login',
                name: 'login',
                component: () => import(/* webpackChunkName: "auth" */ ('/@/views/auth/Login.vue'))
            },
            {
                path: '/auth/register',
                name: 'register',
                component: () => import(/* webpackChunkName: "auth" */ ('/@/views/auth/Register.vue'))
            },
            {
                path: '/auth/forget',
                name: 'forget',
                component: () => import(/* webpackChunkName: "auth" */ ('/@/views/auth/Forget.vue'))
            },
        ]
    },
    {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('/@/views/404.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from,next) => {
    let user = undefined
    try{
        user = store.state.user.username
    } catch (e) {

    }

    let matched = to.path.match('^/auth/+')
    // console.log('before from', from.path, ' to ', to.path)
    if (!user) {
        if (matched == null) {
            next('/auth/login') // 未登录
        }
    }
    next()
    // return false // 返回 false 以取消导航
})


export default router
