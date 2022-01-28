import {createStore} from 'vuex'
import user from './module/user'
import app from './module/app'

// const store = createStore({
//     state() {
//         return {
//             count: 0
//         }
//     },
//     mutations: {
//         increment(state: any) {
//             console.log('vuex, sate', state)
//             state.count++
//         }
//     }
// })

const store = createStore({
    modules: {
        user,
        app
    }
})

export default store