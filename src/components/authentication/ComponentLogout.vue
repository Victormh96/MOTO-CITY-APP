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
    setup() {

        const showModal = () => {

            Modal.confirm({

                title: 'Motocity App',

                content: 'Tu sesión está a punto de finalizar.',

                centered: true,

                okText: 'Si',

                cancelText: 'No',

                async onOk() {

                    await store.dispatch("CuentaCerrar")

                    getClose('Sesión cerrada')

                    return
                }
            })
        }

        return {
            showModal
        }
    }
};
</script>