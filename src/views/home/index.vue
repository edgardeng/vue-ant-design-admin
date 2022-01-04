<template>
  <a-layout>
    <a-layout-header >
      <HeadBar> </HeadBar>
    </a-layout-header>

    <a-layout-content :style="{ margin: '24px 16px', padding: '24px',minHeight: '280px',textAlign:'center' }">
      <Content></Content>

<!--      <img alt="logo" src="../assets/logo.png"/>-->
<!--      <HelloWorld msg="Hello Admin！"></HelloWorld>-->
<!--      <router-link to="/auth/login">{{ $t('user.login.login') }}</router-link>-->
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import HeadBar from './layouts/HeadBar.vue'
import Content from './layouts/Content.vue'


export default defineComponent({
  components: {
    HeadBar,
    Content
  },
  setup() {
    const isFullscreen = ref(false)
    const handleFullscreenToggle = () => {
      console.log('handleFullscreenToggle')
    }

    return {
      isFullscreen,
      currentUser: ref({name: 'Edgar'}),
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      handleFullscreenToggle
    };
  },
});
</script>
<style>

</style>