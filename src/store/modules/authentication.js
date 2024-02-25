import axios from "axios"

import {
    getOpen,
    getError,
    getWarning
} from "@/utils/index"

import {
    CuentaApi
} from "../../services/paths"

export default {

    state() {

        return {

            cuenta: null
        }
    },

    mutations: {

        MutationCuenta(state, data) {

            state.cuenta = data
        },

        MutationCerrar(state) {

            state.cuenta = null
        }
    },

    actions: {

        async Cuenta({ commit }, body) {

            await axios
                .post(CuentaApi, body)

                .then((response) => {

                    commit("MutationCuenta", response.data)

                    getOpen("Bienvenido a Motocity App")
                })

                .catch((err) => {

                    if (err?.response?.status == 401) {

                        getWarning(err?.response?.data?.message)

                    } else {

                        getError("Error de servidor")
                    }
                })
        },

        async CuentaCerrar({ commit }) {

            await commit("MutationCerrar")
        }
    }
};