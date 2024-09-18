<template>
    <!--Icon-->
    <i class="fas fa-sign-out-alt" @click="showModal"></i>
</template>

<!--=======Script=======-->
<script>
import {
    getClose
} from "@/utils/index"

import {
    Modal
} from "ant-design-vue"

export default {
    setup() {

        const showModal = () => {

            Modal.confirm({

                title: "Motocity App",

                content: "Tu sesión está a punto de finalizar.",

                centered: true,

                okText: "Si",

                cancelText: "No",

                onOk() {

                    getClose("Sesión cerrada")

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