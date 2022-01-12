<template>
  <a-row type="flex" justify="space-between">
        <a-col :span="auto">
          <div class="logo" style="height: 64px;">
            <img alt="logo" src="/resource/img/logo.png" style="width: 32px"/>
            <span  >Ant Design Admin</span>
          </div>
          <!--            <menu-unfold-outlined-->
          <!--                v-if="collapsed"-->
          <!--                class="trigger"-->
          <!--                @click="() => (collapsed = !collapsed)"/>-->
          <!--            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>-->
        </a-col>
        <a-col :span="auto">
          <a-space :size="15">
            <!-- 主题 -->
            <DarkModeSwitch> </DarkModeSwitch>
            <!-- 全屏 -->
            <div >
              <span @click="handleFullscreenToggle" style="font-size: 20px;vertical-align: middle;">
              <FullscreenOutlined v-if="!isFullscreen" />
              <FullscreenExitOutlined v-else />
            </span>
            </div>
            <!-- 通知 -->
            <div >
              <a-badge dot style="font-size: 20px;vertical-align: middle;">
                <BellOutlined />
              </a-badge>
            </div>
            <!-- 个人 -->
            <a-dropdown placement="bottomRight">
              <span class="nav-account-avatar">
                <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
                <span style="margin-left: 5px;vertical-align: middle;">{{ currentUser.name }}</span>
              </span>
              <template v-slot:overlay>
                <a-menu class="ant-pro-drop-down menu" :selected-keys="[]" @click="handleMenuClick">
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
          </a-space>
        </a-col>
      </a-row>
</template>
<script lang="ts">
import {
  UserOutlined,
  BellOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import DarkModeSwitch from '/@/components/DarkModeSwitch.vue'
import { Modal, message as Message, notification } from 'ant-design-vue';
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {login }from '/@/api/auth.ts'
import toggleFullScreen from '/@/utils/document/fullscreen.ts'

export default defineComponent({
  components: {
    UserOutlined,
    DarkModeSwitch,
    BellOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  setup() {
    const {t, locale} = useI18n();
    const route = useRouter()
    const isFullscreen = ref(false)
    const handleFullscreenToggle = () => {
      isFullscreen.value = !isFullscreen.value
      toggleFullScreen()
    }
    return {
      isFullscreen,
      currentUser: ref({name: 'Edgar'}),
      handleFullscreenToggle,
      handleMenuClick:() => {
        const opt: ModalFuncProps = {
          centered: true,
          // icon: getIcon(iconType),
            title:  t('menu.hint'),
            content: t('menu.account.is_logout'),
            okText: t('menu.ok'),
            cancelText: t('menu.cancel'),
            onOk: () => {
              route.replace('/auth/login')
            },
        };
        Modal.confirm(opt)
        //
        // createConfirm({
        //   iconType: 'warning',
        //   title: () => h('span', t('sys.app.logoutTip')),
        //   content: () => h('span', t('sys.app.logoutMessage')),
        //   onOk: async () => {
        //     await this.logout(true);
        //   },
        // });
      }
    };
  },
});
</script>
<style>

</style>