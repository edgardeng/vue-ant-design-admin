import {createRouter, createWebHistory} from 'vue-router'
//import type {RouteRecordRaw, RouteMeta} from 'vue-router';
// import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const AuthLayout = () => import('/@/views/auth/index.vue');

const routes = [
    {path: '/', component: () => import('/@/views/home.vue')},
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
        ]
    },
    {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('/@/views/404.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
