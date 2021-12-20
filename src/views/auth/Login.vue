<template>
  <div class="main">
    <a-form
        id="formLogin"
        class="user-layout-login"
        ref="loginRef"
        :model="form"
        :rules="rules"
        @submit="handleSubmit">
      <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick">
        <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                   :message="$t('user.login.message-invalid-credentials')"/>
          <a-form-item name="username">
            <a-input
                size="large"
                type="text"
                :placeholder="$t('user.login.username.placeholder')"
                v-model:value="form.username">
              <template #prefix>
                <UserOutlined/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
                size="large"
                :placeholder="$t('user.login.password.placeholder')"
                v-model:value="form.password">
              <template #prefix>
                <LockOutlined/>
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-mobile')">
          <a-form-item name="mobile">
            <a-input size="large"
                     type="text"
                     :placeholder="$t('user.login.mobile.placeholder')"
                     v-model:value="form.mobile">
              <template #prefix>
                <MobileOutlined/>
              </template>

              <!--                     v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: $t('user.login.mobile.placeholder') }], validateTrigger: 'change'}]">-->
              <!--              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item name="captcha">
                <a-input size="large" type="text"
                         :placeholder="$t('user.login.mobile.verification-code.placeholder')"
                         v-model:value="form.captcha">
                  <template #prefix>
                    <MailOutlined/>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                  class="onSendCaptcha"
                  tabindex="-1"
                  :disabled="!enableCaptcha"
                  @click.stop.prevent="onSendCaptcha"
                  v-text="enableCaptcha && $t('user.register.get-verification-code') || (captchaSecond +' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
         <a-checkbox :checked="remember">{{ $t('user.login.remember-me') }} </a-checkbox>
         <router-link to="/auth/forget" class="forge-password" style="float: right;">{{ $t('user.login.forgot-password') }}</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
        >{{ $t('user.login.login') }}
        </a-button>
        <img src="/api/auth/captcha" alt="" width="20">
      </a-form-item>

      <div class="user-login-other">
        <a-space>
          <span>{{ $t('user.login.sign-in-with') }}</span>
          <a><AlipayCircleOutlined style="color: #08c"/> </a>
          <a><WechatOutlined style="color: #f51655"/> </a>
          <a><WeiboCircleOutlined  style="color: #0dc836"/> </a>
        </a-space>

        <router-link class="register" :to="{ name: 'register' }">{{ $t('user.login.signup') }}</router-link>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts">
import {UserOutlined, LockOutlined, MailOutlined, MobileOutlined,
  AlipayCircleOutlined, WeiboCircleOutlined,WechatOutlined } from "@ant-design/icons-vue";
import md5 from 'md5'
import {defineComponent, ref, reactive} from 'vue'
import type { UnwrapRef } from 'vue';
import {useI18n} from 'vue-i18n'
import {login }from '/@/api/auth.ts'


export default defineComponent({
  name: 'AuthLogin',
  components: {
    UserOutlined, LockOutlined, MobileOutlined, MailOutlined,
    AlipayCircleOutlined,  WeiboCircleOutlined,WechatOutlined
  },
  setup() {
    const {t, locale} = useI18n();
    const loginRef = ref();
    interface FormState {
      username: string;
      password: string;
      mobile: string;
      captcha:string
    }
    const form: UnwrapRef<FormState> = reactive({
      username: '',
      password: undefined,
      mobile: undefined,
      captcha:undefined
    });
    const enableCaptcha = ref(true)
    const captchaSecond = ref(60)
    
    const lng = ref('zh-CN')
    const loginType = ref(0)
    const customActiveKey = ref('')
    const loginBtn = ref(false)

    const remember = ref(false)
    const password = ref('')
    const smsCaptcha = ref('')
    const mobile = ref('')
    const handleUsernameOrEmail = (rule, value, callback) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        loginType.value = 0
      } else {
        loginType.value = 1
      }
      callback()
    }
    const rules = {
      username: [
        {required: true, message: t('user.username.required'), trigger: 'change'},
        {validator: handleUsernameOrEmail, trigger: 'change'}],
      password: [{required: true, message: t('user.password.required'), trigger: 'change'}],
      mobile:  [{ required: true, pattern: /^1[34578]\d{9}$/, message: t('user.phone-number.required') }],
      captcha:  [{ required: true, pattern: /^\d{4}$/, message: t('user.verification-code.required') }],
    };

    const handleTabClick = (key: string) => {
      customActiveKey.value = key
    }
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      login(form.username,md5(form.password)).then((res:any) => {
        console.log(res)
      })
      // const {
      //   form: {validateFields},
      //   state,
      //   customActiveKey,
      //   Login
      // } = this
      //
      // state.loginBtn = true
      //
      // const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']
      //
      // validateFields(validateFieldsKey, {force: true}, (err, values) => {
      //   if (!err) {
      //     console.log('login form', values)
      //     const loginParams = {...values}
      //     delete loginParams.username
      //     loginParams[!state.loginType ? 'email' : 'username'] = values.username
      //     loginParams.password = md5(values.password)
      //     Login(loginParams)
      //         .then((res) => this.loginSuccess(res))
      //         .catch(err => this.requestFailed(err))
      //         .finally(() => {
      //           state.loginBtn = false
      //         })
      //   } else {
      //     setTimeout(() => {
      //       state.loginBtn = false
      //     }, 600)
      //   }
      // })
    }
    const onSendCaptcha = (e: Event) => {
      console.log('--- start onSendCaptcha')
      enableCaptcha.value = false
      const interval = window.setInterval(() => {
        if (captchaSecond.value-- <= 0) {
          captchaSecond.value = 60
          enableCaptcha.value = true
          window.clearInterval(interval)
        }
      }, 1000)



      // e.preventDefault()
      // const { form: { validateFields }, state } = this
      //
      // validateFields(['mobile'], { force: true }, (err, values) => {
      //   if (!err) {
      //     state.smsSendBtn = true
      //
      //     const interval = window.setInterval(() => {
      //       if (state.time-- <= 0) {
      //         state.time = 60
      //         state.smsSendBtn = false
      //         window.clearInterval(interval)
      //       }
      //     }, 1000)
      //
      //     const hide = this.$message.loading('验证码发送中..', 0)
      //     getSmsCaptcha({ mobile: values.mobile }).then(res => {
      //       setTimeout(hide, 2500)
      //       this.$notification['success']({
      //         message: '提示',
      //         description: '验证码获取成功，您的验证码为：' + res.result.captcha,
      //         duration: 8
      //       })
      //     }).catch(err => {
      //       setTimeout(hide, 1)
      //       clearInterval(interval)
      //       state.time = 60
      //       state.smsSendBtn = false
      //       this.requestFailed(err)
      //     })
      //   }
      // })
    }
    const loginSuccess = (res: any) => {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      // this.$router.push({ path: '/' })
      // // 延迟 1 秒显示欢迎信息
      // setTimeout(() => {
      //   this.$notification.success({
      //     message: '欢迎',
      //     description: `${timeFix()}，欢迎回来`
      //   })
      // }, 1000)
      // this.isLoginError = false
    }
    const requestFailed = (err: any) => {
      // this.isLoginError = true
      // this.$notification['error']({
      //   message: '错误',
      //   description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
      //   duration: 4
      // })
    }

    return {
      loginRef,
      rules,
      form,
      enableCaptcha,
      captchaSecond,
      customActiveKey,
      loginBtn,
      // login type: 0 email, 1 username, 2 telephone
      loginType,
      remember,
      password,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
     
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      onSendCaptcha,
      handleSubmit,
      handleUsernameOrEmail,
      handleTabClick,
    }
  },
  created() {
    console.log('Login, created')
  },

})
</script>

<style lang="scss" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .onSendCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    a span {
        font-size: 22px;
    }

    .register {
      float: right;
    }
  }
}
</style>
