const user = {
    state: () => ({
        username: undefined,
        userid: 0,
        role: 'admin'
    }),
    mutations: {
        // setCurrentUser(state: any, info:any) {
        //     state.userid = info.userid
        //     state.username = info.username
        //     state.role = info.role
        // },
        SET_CURRENT_USER: (state: any, info:any) => {
            console.log('SET_CURRENT_USER', info)
            state.userid = info.userid
            state.username = info.username
            state.role = info.role
        },
    },
    // actions: { ... },
    // getters: { ... }
}

export default user