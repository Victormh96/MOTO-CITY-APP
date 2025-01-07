import {
    defineStore
} from "pinia"

import {
    getOpen,
    getError,
    getWarning
} from "@/utils"

import {
    CuentaApi
} from "@/services/auth"

import axios from "axios"

export const authentication = defineStore("authentication", {

    state: () => ({

        cuenta: null
    }),

    persist: true,

    actions: {

        async Cuenta(body) {

            try {

                const response = await axios.post(CuentaApi, body)

                this.cuenta = response.data

                getOpen("Bienvenido a Motocity App")

            } catch (err) {

                if (err?.response?.status === 401) {

                    getWarning(err?.response?.data?.message)

                } else {

                    getError("Error de servidor")
                }
            }
        },

        CuentaCerrar() {

            this.cuenta = null
        }
    }
})
