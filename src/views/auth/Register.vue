<template>
  <div class="main user-layout-register">
    <a-form ref="registerRef" :model="form" id="formRegister" :rules="rules">
      <a-form-item name="username">
        <a-input
            v-model:value="form.username"
            size="large"
            type="text"
            :placeholder="$t('user.login.username')">
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
            v-model:value="form.password"
            size="large"
            @click="passwordLevelChecked = true"
            :placeholder="$t('user.register.password.placeholder')">
        </a-input-password>
        <div v-show="form.password.length>=6">
          <span :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</span>
          <a-progress :percent="percent" :showInfo="false" :strokeColor="passwordLevelColor"/>
        </div>

      </a-form-item>

      <a-form-item name="email">
        <a-input
            size="large"
            :value="form.email"
            :placeholder="$t('user.register.email.placeholder')">
        </a-input>
      </a-form-item>

      <a-form-item name="mobile">
        <a-input size="large" :placeholder="$t('user.login.mobile.placeholder')"
                 v-model:value="form.mobile">
          <!--                 v-decorator="['mobile', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">-->
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
          </a-input-group>-->

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
              size="large"
              class="onSendCaptcha"
              tabindex="-1"
              :disabled="!enableCaptcha"
              @click.stop.prevent="onSendCaptcha"
              v-text="enableCaptcha && $t('user.register.get-verification-code') || (captchaSecond +' s')"
          ></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="register-button"
            :loading="!enbleSubmit"
            @click.stop.prevent="handleSubmit"
            :disabled="!enbleSubmit">{{ $t('user.register.register') }}
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">{{ $t('user.register.sign-in') }}</router-link>
      </a-form-item>

    </a-form>
  </div>
</template>

<script lang="ts" setup>
import {scorePassword} from '/@/utils/validator.ts'
import md5 from 'md5'
import {reactive, UnwrapRef, ref, computed} from "vue"
import {createI18n, useI18n} from "vue-i18n";
import {register} from '/@/api/auth.ts'

const {t, locale} = useI18n()

const registerRef = ref();
const form: UnwrapRef<any> = reactive({
  username: undefined,
  email: undefined,
  password: '',
  mobile: undefined,
  captcha: undefined
});
const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = ['#ff0000', '#ff3040', '#ff7e05', '#52c41a']

const handlePasswordLevel = (rule, value, callback) => {
  if (value === '') {
    return callback()
  }
  var level = 0
  if (value.length >= 6) {
    if (scorePassword(value) >= 30) {
      level = 1
    }
    if (scorePassword(value) >= 60) {
      level = 2
    }
    if (scorePassword(value) >= 80) {
      level = 3
    }
  } else {
    return Promise.reject(t('user.password.strength.msg'));
  }
  passwordLevel.value = level
  passwordLevelClass.value = levelClass[level]
  passwordLevelName.value = levelNames[level]
  passwordLevelColor.value = levelColor[level]
  percent.value = level * 33 + 1
  return Promise.resolve()
}

const rules = {
  username: [
    {required: true, message: t('user.username.required'), trigger: 'change'},
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
      trigger: 'change',
      message: t('user.format.error')
    }],
  password: [{required: true, message: t('user.password.required'), trigger: 'change'},
    {min: 6, max: 18, message: t('user.password.length.required'), trigger: 'blur'},
    {validator: handlePasswordLevel, trigger: 'change'}],
  mobile: [{required: true, pattern: /^1[34578]\d{9}$/, message: t('user.phone-number.required')}],
  captcha: [{required: true, pattern: /^\d{4}$/, message: t('user.verification-code.required')}],
};

const passwordLevelChecked = ref(false)
const percent = ref(0)
const passwordLevel = ref(0)
const passwordLevelClass = ref(levelClass[0])
const passwordLevelName = ref(levelNames[0])
const passwordLevelColor = ref(levelColor[0])

const enableCaptcha = ref(true)
const captchaSecond = ref(60)
const enbleSubmit = ref(true)

const handleSubmit = (e: Event) => {
  enbleSubmit.value = false
  e.preventDefault()
  // console.log(...form)
  register(form.username, form.password, form.email, form.mobile, form.captcha).then((res: any) => {
    console.log(res)
    enbleSubmit.value = true
  })


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
}

// import { getSmsCaptcha } from '@/api/login'
// import { deviceMixin } from '@/store/device-mixin'

//

// export default {
//   name: 'Register',
//   components: {
//   },
//   mixins: [deviceMixin],
//   data () {
//     return {
//       form: this.$form.createForm(this),
//
//       state: {
//         time: 60,
//         level: 0,
//         smsSendBtn: false,
//         passwordLevel: 0,
//         passwordLevelChecked: false,
//         percent: 10,
//         progressColor: '#FF0000'
//       },
//       registerBtn: false
//     }
//   },
//   computed: {
//     passwordLevelClass () {
//       return levelClass[this.state.passwordLevel]
//     },
//     passwordLevelName () {
//       return levelNames[this.state.passwordLevel]
//     },
//     passwordLevelColor () {
//       return levelColor[this.state.passwordLevel]
//     }
//   },
//   methods: {
//     handlePasswordLevel (rule, value, callback) {
//       if (value === '') {
//        return callback()
//       }
//       console.log('scorePassword ; ', scorePassword(value))
//       if (value.length >= 6) {
//         if (scorePassword(value) >= 30) {
//           this.state.level = 1
//         }
//         if (scorePassword(value) >= 60) {
//         this.state.level = 2
//         }
//         if (scorePassword(value) >= 80) {
//         this.state.level = 3
//         }
//       } else {
//         this.state.level = 0
//         callback(new Error(this.$t('user.password.strength.msg')))
//       }
//       this.state.passwordLevel = this.state.level
//       this.state.percent = this.state.level * 33
//
//       callback()
//     },
//
//     handlePasswordCheck (rule, value, callback) {
//       const password = this.form.getFieldValue('password')
//       // console.log('value', value)
//       if (value === undefined) {
//         callback(new Error(this.$t('user.password.required')))
//       }
//       if (value && password && value.trim() !== password.trim()) {
//         callback(new Error(this.$t('user.password.twice.msg')))
//       }
//       callback()
//     },
//
//     handlePhoneCheck (rule, value, callback) {
//       console.log('handlePhoneCheck, rule:', rule)
//       console.log('handlePhoneCheck, value', value)
//       console.log('handlePhoneCheck, callback', callback)
//
//       callback()
//     },
//

//
//     handleSubmit () {
//       const { form: { validateFields }, state, $router } = this
//       validateFields({ force: true }, (err, values) => {
//         if (!err) {
//           passwordLevelChecked = false
//           $router.push({ name: 'registerResult', params: { ...values } })
//         }
//       })
//     },
//
//     getCaptcha (e) {
//       e.preventDefault()
//       const { form: { validateFields }, state, $message, $notification } = this
//
//       validateFields(['mobile'], { force: true },
//         (err, values) => {
//           if (!err) {
//             state.smsSendBtn = true
//
//             const interval = window.setInterval(() => {
//               if (state.time-- <= 0) {
//                 state.time = 60
//                 state.smsSendBtn = false
//                 window.clearInterval(interval)
//               }
//             }, 1000)
//
//             const hide = $message.loading('验证码发送中..', 0)
//
//             getSmsCaptcha({ mobile: values.mobile }).then(res => {
//               setTimeout(hide, 2500)
//               $notification['success']({
//                 message: '提示',
//                 description: '验证码获取成功，您的验证码为：' + res.result.captcha,
//                 duration: 8
//               })
//             }).catch(err => {
//               setTimeout(hide, 1)
//               clearInterval(interval)
//               state.time = 60
//               state.smsSendBtn = false
//               this.requestFailed(err)
//             })
//           }
//         }
//       )
//     },
//     requestFailed (err) {
//       this.$notification['error']({
//         message: '错误',
//         description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
//         duration: 4
//       })
//       this.registerBtn = false
//     }
//   },
//   watch: {
//     'state.passwordLevel' (val) {
//       console.log(val)
//     }
//   }
// }
</script>
<style lang="scss" scoped>
.user-layout-register {

  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
