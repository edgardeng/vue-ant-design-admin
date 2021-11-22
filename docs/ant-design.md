# Ant Design Vue
> Ant Design 的 Vue 实现，开发和服务于企业级后台产品
> [文档](https://next.antdv.com/docs/vue/introduce-cn) [Github](https://github.com/vueComponent/ant-design-vue)
## 引入 ant-design-vue
1. 使用前端构建工具Vite 创建项目 
   ```
   npm init @vitejs/app my-vue-app -- --template vue  # npm 7+, 需要额外的双横线：
   yarn create @vitejs/app my-vue-app --template vue # yarn
   ```

2. 安装依赖, 安装组件
   ```
   npm install
   npm i --save ant-design-vue@next
   ```
 
3. 使用组件  

完整引入
   ```javascript
   import { createApp } from "vue";
   import App from "./App.vue";
   import Antd from 'ant-design-vue';
   import 'ant-design-vue/dist/antd.css';
   const app = createApp(App).use(Antd);
   app.mount("#app");
   ``` 

局部注册    
```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { Button, message } from 'ant-design-vue';
/* 会自动注册 Button 下的子组件, 例如 Button.Group */
const app = createApp(App)
app.use(Button).mount('#app');
app.config.globalProperties.$message = message;
```
