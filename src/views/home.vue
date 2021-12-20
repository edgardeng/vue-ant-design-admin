<template>
  <a-layout style="height: 100%;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" style="height: 64px;">
        <img alt="logo" src="../assets/logo.png" style="width: 32px"/>
        <span v-show="!collapsed">Ant Design Admin</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined/>
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined/>
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined/>
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff;">
        <a-row type="flex" justify="space-between">
          <a-col :span="auto">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
          </a-col>
          <a-col :span="auto">
            <DarkModeSwitch> </DarkModeSwitch>
          </a-col>
          <a-col :span="auto">
            <a-dropdown placement="bottomRight">
              <span class="ant-pro-account-avatar">
                <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
                <span>{{ currentUser.name }}</span>
              </span>
              <template v-slot:overlay>
                <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
                  <a-menu-item key="center" >
                    <a-icon type="user"/>
                    {{ $t('menu.account.center') }}
                  </a-menu-item>
                  <a-menu-item  key="settings">
                    <a-icon type="setting"/>
                    {{ $t('menu.account.settings') }}
                  </a-menu-item>
                  <a-menu-divider  />
                  <a-menu-item key="logout">
                    <a-icon type="logout"/>
                    {{ $t('menu.account.logout') }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px',textAlign:'center' }">
        <img alt="logo" src="../assets/logo.png"/>
        <HelloWorld msg="Hello Admin！"></HelloWorld>
        <router-link to="/auth/login">{{ $t('user.login.login') }}</router-link>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import HelloWorld from '/@/components/HelloWorld.vue'
import DarkModeSwitch from '/@/components/DarkModeSwitch.vue'

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HelloWorld,
    DarkModeSwitch
  },
  setup() {
    return {
      currentUser: ref({name: 'Edgar'}),
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>