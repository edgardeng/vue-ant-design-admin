<template>
  <a-layout>
    <a-layout-header >
      <HeadBar> </HeadBar>
    </a-layout-header>
    <a-layout-content :style="{ margin: '24px 16px', padding: '24px',minHeight: '280px',textAlign:'center' }">
      <Content></Content>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import HeadBar from './layouts/HeadBar.vue'
import Content from './layouts/Content.vue'
console.log('Home setup')
</script>
<style>

</style>