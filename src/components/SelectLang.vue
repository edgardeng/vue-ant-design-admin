<template>
  <a-dropdown>
    <span class="lang-dropdown-link" >
      <GlobalOutlined/>
    </span>
    <template #overlay>
      <a-menu @click="onChangeLanguage">
        <a-menu-item key="zh-CN"> 中文</a-menu-item>
        <a-menu-item key="en-US"> English</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import {GlobalOutlined} from '@ant-design/icons-vue'
import {useI18n} from 'vue-i18n'
const {locale} = useI18n();
const onChangeLanguage = (item: any) => {
  locale.value = item.key
}
</script>

<style scoped>
.lang-dropdown-link {
  cursor: pointer;
  margin-right: 24px;
}
</style>



