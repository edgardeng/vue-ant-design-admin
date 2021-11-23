## Vuex
> [Vuex](https://next.vuex.vuejs.org/zh/)
> 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

状态自管理应用包含以下几个部分：

 * 状态，驱动应用的数据源；
 * 视图，以声明方式将状态映射到视图；
 * 操作，响应在视图上的用户输入导致的状态变化

### State 单一状态树
> 每个应用将仅仅包含一个 store 实例


### Getter 

### Mutation

> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 事件

每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。
 
```javascript
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

`store.commit('increment')` 当触发一个类型为 increment 的 mutation 时，调用此函数

提交载荷（Payload）/额外参数: `store.commit('increment', 10)`.
在大多数情况下，载荷应该是一个对象

另一种方式是直接使用包含 type 属性的对象 
`store.commit({
  type: 'increment',
  amount: 10
  })`

> 重要的原则: Mutation 必须是同步函数

### Action
> Action 类似于 mutation，不同在于： 
 1. Action 提交的是 mutation，而不是直接变更状态。
 2. Action 可以包含任意异步操作

```javascript
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters

__Action 通过 store.dispatch 方法触发 `store.dispatch('increment')` __

使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用

### Module
> Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

 
1. 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
2. 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：


在 store 创建之后，你可以使用 store.registerModule 方法注册模块：

```javascript
import { createStore } from 'vuex'

const store = createStore({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```