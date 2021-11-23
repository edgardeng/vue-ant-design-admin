# Vue Ant Design Admin

## How to Start 

### 1. use Vite to build a project
```
yarn create @vitejs/app my-vue-app --template vue
```
### 2. install components
```
npm install & npm i --save ant-design-vue@next
```

### 3. use Typescript
   > 1. add {"typescript": "^4.4.3"} in package.json
   > 2. add `tsconfig.json`
   > 3. add `vite.config.ts`
   > 4. add `main.ts`
   > 5. add `env.d.ts`
   > 6. change "/src/main.js" to "/src/main.ts" in index.html


### 4. use vue-router
  1. add `router/index.ts`
   ```javascript
   import {createRouter, createWebHistory} from 'vue-router'
   const routes = [
      {path: '/', component: () => import('/@/views/home.vue')},
      {path: '/auth/login', component: () => import('/@/views/auth/Login.vue')},
   ]
 
   const router = createRouter({
   history: createWebHistory(),
   routes,
   }) // 3. 创建路由实例并传递 `routes` 配置
   export default router
   ```
   
   2. `App.vue` 添加`<router-view/>`组件
   3. `main.ts`注册插件`import router from './router'; app.use(router)`

### 5. 使用scss： 
   ``` npm install node-sass sass-loader sass -D ```

### 6. 使用Vuex
  > [Vuex文档](https://next.vuex.vuejs.org/)
 1. 安装 ` npm install vuex@next --save `
 2. 添加 `store/index.ts`
   ```javascript
   import { createStore } from 'vuex'
   export const store = createStore({
       state () {
           return {
               count: 0
           }
       },
       mutations: {
           increment (state) {
               console.log('vuex, sate', state)
               state.count++
           }
       }
   })
  ```
  3. 注册插件 `main.ts`注册插件`import {store} from './store';app.use(store)`
  4. 在组件中使用状态管理
   ```javascript
   import { useStore } from 'vuex'
   const store = useStore()
   
   const count = computed(() => store.state.count)
   const addNum = () => {
     store.commit('increment')
   }
   ```

### 7. 使用国际化 
 1. 安装插件： ` npm install vue-i18n --save-dev `
 2. 添加 `locales/index.ts`
  ```javascript
   import {createI18n} from 'vue-i18n'
   const messages = {
       'en-US': {
           login: 'Login'
       },
       'zh-CN': {
           login: '登录'
       }
   }
   const i18n = createI18n({
       legacy: false,
       locale: 'zh-CN',
       messages
   })
   export default i18n
   ```
  3. 注册插件 `main.ts`注册插件`import i18n from './locales'; app.use(i18n)`
  4. 在组件中使用状态管理
   ```javascript
   //  <a-button > {{ t('login') }} </a-button>
   const {t, locale} = useI18n();
   const lng = ref('zh-CN')
   console.log(locale)
   const changeLanguage = () => {
      lng.value = lng.value == 'zh-CN' ?  'en-US': 'zh-CN'
      locale.value = lng.value
   }
   ```

