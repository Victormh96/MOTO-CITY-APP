import {
    defineStore
} from "pinia"

import {
    getClose
} from "@/utils"

import {
    getToken
} from "@/utils/request"

import {
    GetProfesionApi,
    GetMunicipioApi,
    GetDepartamentoApi
} from "@/services/tools"

import axios from "axios"

export const tools = defineStore("tools", {

    state: () => ({

        profesion: null,

        municipio: null,

        departamento: null
    }),

    persist: true,

    actions: {

        async Profesion() {

            const { config } = getToken()

            try {

                const response = await axios.get(GetProfesionApi(), config)

                this.profesion = response.data

            } catch (err) {

                console.error(err)

                getClose("Sesión cerrada")
            }
        },

        async Municipio() {

            const { config } = getToken()

            try {

                const response = await axios.get(GetMunicipioApi(), config)

                this.municipio = response.data

            } catch (err) {

                console.error(err)

                getClose("Sesión cerrada")
            }
        },

        async Departamento() {

            const { config } = getToken()

            try {

                const response = await axios.get(GetDepartamentoApi(), config)

                this.departamento = response.data

            } catch (err) {

                console.error(err)

                getClose("Sesión cerrada")
            }
        },

        CuentaCerrar() {

            this.profesion = null

            this.municipio = null

            this.departamento = null
        }
    }
})
