<script setup lang="ts">
import {ref, computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const count = computed(() => store.state.count)
const addNum = () => {
  store.commit('increment')
}

defineProps({
  msg: String
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="addNum">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
    <div>
      <a-button type="primary" shape="circle" icon="search" />
      <a-button type="primary" shape="circle">
        A
      </a-button>
      <a-button type="primary" icon="search">
        Search
      </a-button>
      <a-button shape="circle" icon="search" />
      <a-button icon="search">
        Search
      </a-button>
      <a-button shape="circle" icon="search" />
      <a-button icon="search">
        Search
      </a-button>
      <a-button type="dashed" shape="circle" icon="search" />
      <a-button type="dashed" icon="search">
        Search
      </a-button>

      <div class="icons-list">
        icons
        <a-switch :checked="true">
          <template #checkedChildren><check-outlined /></template>
          <template #unCheckedChildren><close-outlined /></template>
        </a-switch>
      </div>


        <div>
          <a-switch checked-children="开" un-checked-children="关" default-checked />
          <br />
          <a-switch checked-children="1" un-checked-children="0" />
          <br />
          <a-switch default-checked>
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </div>


    </div>

</template>

<style scoped>
a {
  color: #42b983;
}
</style>
