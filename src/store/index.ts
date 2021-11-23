import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state: any) {
            console.log('vuex, sate', state)
            state.count++
        }
    }
})
export default store