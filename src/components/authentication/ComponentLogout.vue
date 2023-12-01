<template>
    <!--Icon-->
    <i class="fas fa-sign-out-alt" @click="showModal"></i>
</template>

<!--=======Script=======-->
<script>
import store from "@/store"

import {
    Modal
} from "ant-design-vue"

import {
    getClose
} from "@/utils/index"

export default {
    data() {
        return {
            expire: 720
        }
    },

    created() {

        const hora = this.$store.state.authentication?.cuenta?.Hora

        this.expire = Math.max(0,

            (new Date(hora).getTime() + this.expire * 60000 - new Date().getTime()) / 60000)

        this.doChangeTiempo()
    },

    setup() {

        const showModal = () => {

            Modal.confirm({

                title: 'Motocity Go',

                content: 'Tu sesión está a punto de finalizar.',

                centered: true,

                okText: 'Si',

                cancelText: 'No',

                onOk() {

                    store.dispatch("CuentaCerrar")

                    getClose('Sesión cerrada')

                    return
                }
            })
        }

        return {
            showModal
        }
    },

    methods: {

        doChangeTiempo() {

            this.expire = this.expire - (1 / 60)

            if (this.expire <= 0) {

                Modal.destroyAll()

                store.dispatch("CuentaCerrar")

                getClose('Sesión cerrada')
            }
        }
    },
};
</script>