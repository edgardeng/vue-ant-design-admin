import {createI18n} from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

export const defaultLang = 'zh-CN'
const messages = {
    'en-US': {
        ...enUS
    },
    'zh-CN': {
        ...zhCN
    }
}

// your message resolver
function messageResolver(obj, path) {
    const msg = obj[path]
    return msg != null ? msg : null
}

// call with I18n option
const i18n = createI18n({
    legacy: false,
    locale: defaultLang,
    messageResolver, // set your message resolver
    messages
})

export default i18n
