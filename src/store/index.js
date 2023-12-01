import { createStore, createLogger } from "vuex"
import authentication from "./modules/authentication"
import createPersistedState from "vuex-persistedstate"

export default createStore({
    
    state: {
    },

    getters: {
    },

    mutations: {
    },

    actions: {
    },

    modules: {

        authentication
    },

    plugins: [createLogger(), createPersistedState()]
})