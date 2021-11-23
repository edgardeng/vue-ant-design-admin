##  setup 语法糖
>只需在script标签中添加setup，组件只需引入不用注册，属性和方法也不用返回，也不用写setup函数，也不用写export default ，甚至是自定义指令也可以在我们的template中自动获得。

```html
<template>
  <my-component :num="num" @click="addNum" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import MyComponent from './MyComponent .vue'; //必须使用驼峰命名
  // 像在平常的setup中一样的写,但是不需要返回任何变量
  const num= ref(0)       / /在此处定义的 num 可以直接使用
  const addNum= () => {   // 函数也可以直接引用,不用在return中返回
    num.value ++
  }
</script>
```
 
### 因为没有了setup函数，那么props，emit，attrs怎么获取呢

setup script语法糖提供了新的API来供我们使用

defineProps 用来接收父组件传来的 props ;

defineEmits 用来声明触发的事件。

__父组件__

   ```html
    <template>
      <my-son foo="🚀🚀🚀🚀🚀🚀" @childClick="childClick" />
    </template>
    
    <script lang="ts" setup>
    import MySon from "./MySon.vue";
    let childClick = (e: any):void => {
      console.log(e);  //🚀🚀🚀🚀🚀🚀
    };
    </script>
   ```
__子组件__

```html
<template>
  <span @click="sonClick">信息:{{ props.foo }}</span>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps} from "vue";

const emit = defineEmits(["childClick"]);     // 声明触发事件 childClick
const props = defineProps({ foo: String });   // 获取props
console.log(props)

const sonClick = () =>{
    emit('childClick' , props.foo)
}
</script>
```

useSlots 和 useAttrs
在
```
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

defineExpose
如果在父组件中通过ref='xxx’的方法来获取子组件实例，
子组件使用了script setup语法糖,
则子组件的数据需要用defineExpose 的方式导出，否则不会暴露属性。

//父组件
```
<template>
  <Daughter ref="daughter" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Daughter from "./Daughter.vue";

const daughter = ref(null)
console.log('🚀🚀🚀🚀~daughter',daughter)
</script>
```

//子组件
```
<template>
  <div>妾身{{ msg }}</div>
</template>

<script lang="ts" setup>
import { ref ,defineExpose} from "vue";
const msg = ref('貂蝉')
defineExpose({
    msg
})
</script>
 ```