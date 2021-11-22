import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw, RouteMeta} from 'vue-router';
// import HelloWorld from '/@/components/HelloWorld.vue';
// import Login from '/@/views/auth/Login.vue';

const routes = [
    {path: '/', component: () => import('/@/App.vue')},
    {path: '/auth/login', component: () => import('/@/views/auth/Login.vue')},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})


export default router

// import { constantRouterMap } from '@/config/router.config'
//
// // hack router push callback
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
//
// Vue.use(Router)
//
// export default new Router({
//   mode: 'history',
//   routes: constantRouterMap
// })
