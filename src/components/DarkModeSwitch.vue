<!-- Switch for Light Theme or Dark Theme -->
<template>
  <div>
    <button type="button" role="switch" class="dark-switch" :class="{'dark-switch-checked': isDark}"
            @click="onModeChanged"><!---->
      <span class="dark-switch-inner">
        <icon v-if="isDark">
          <template #component>
            <svg class="icon" viewBox="0 0 1024 1024" width="20" height="20">
              <path
                  d="M490 170c14 0 28 1 43 2.858666a194.282667 194.282667 0 1 0 274.218667 274.24c1.877333 14.016 2.858667 28.352 2.858667 42.901334 0 176-143.274667 320-320 320-176 0-320-143.274667-320-320 0-176 143.274667-320 320-320z m224.277333 0v72.853333h72.874667v60.010667l-72.874667-0.021334v72.874667h-59.989333l-0.021334-72.874667h-72.832v-59.989333H654.933333V170.666667h60.010667z"
                  fill="#b56df4"></path>
            </svg>
          </template>
    </icon>
        <icon v-else>
          <template #component>
            <svg class="icon" viewBox="0 0 1024 1024" width="20" height="20">
              <path
                  d="M478 811.349333a304 304 0 0 0 64 0.277334v124h-64v-124z m267-110.229333l87.594666 87.637333-45 45.248-87.658667-87.594666c16.64-13.44 31.829333-28.629333 45.290667-45.290667z m-469.994667-1.493333c13.333333 16.746667 28.416 32 44.970667 45.568L232.533333 834.005333l-45.248-45 89.130667-89.130667zM512 261.034667c138.602667 0 250.986667 112.384 250.986667 250.986666 0 138.602667-112.384 250.986667-250.986667 250.986667-138.602667 0-250.986667-112.384-250.986667-250.986667 0-138.602667 112.384-250.986667 250.986667-250.986666z m423.957333 217.642666v64h-124.330666a304 304 0 0 0-0.277334-64h124.608z m-723.306666 0a304.490667 304.490667 0 0 0-0.277334 64H85.333333v-64h127.317334zM232.533333 187.264l90.346667 90.304c-16.64 13.44-31.829333 28.629333-45.290667 45.290667L187 232.533333l45-45.248z m556.224 0l45.248 45.226667-88 88.874666a302 302 0 0 0-45.546667-44.970666l89.109333-89.130667zM542.656 85v127.04a304 304 0 0 0-64 0.3V85h64z"
                  fill="#f1cd2d"></path>
            </svg>
          </template>
        </icon>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import Icon from '@ant-design/icons-vue'
import {ref} from "vue"

const isDark = ref(false)
const onModeChanged = (e: Event) => {
  isDark.value = !isDark.value
  const root = document.getElementById('html_root')
  root?.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
</script>
<style lang="scss" scoped>
.dark-switch {
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: 44px;
  height: 22px;
  line-height: 20px;
  vertical-align: middle;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  user-select: none;

  background-color: rgb(241, 205, 45,0.3);
 .dark-switch-inner {
   position: absolute;
   top: 1px;
   left: 2px;
   width: 20px;
   height: 20px;
   transition: all 0.36s;
 }
}

.dark-switch.dark-switch-checked {

  background-color: rgb(181, 109, 244,0.3);
  .dark-switch-inner {
    left: 100%;
    margin-left: -2px;
    transform: translateX(-100%);
  }
}
</style>
