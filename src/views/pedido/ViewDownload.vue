<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out">

        <!--Container-->
        <div class="container mb-3">

            <!--Page-->
            <a-page-header title="PEDIDO" @back="() => $router.push('/')">

                <!--Template-->
                <template #backIcon>

                    <!--Icon-->
                    <LeftCircleTwoTone two-tone-color="#db2d3f" />
                </template>
            </a-page-header>

            <!--Calendar-->
            <a-calendar :value="date" @select="onSelect" />

            <!--Popconfirm-->
            <a-popconfirm title="¿Generar documento?" ok-text="Si" cancel-text="No" @confirm="doChangeDownload">

                <!--Button-->
                <a-button class="accion-button blue">
                    DESCARGAR
                </a-button>
            </a-popconfirm>
        </div>
    </a-layout-content>

    <!--Footer-->
    <Footer />
</template>

<!--=======Script=======-->
<script>
import {
    ref
} from "vue"

import {
    getSuccess,
    getResponse
} from "@/utils"

import {
    saveAs
} from "file-saver"

import {
    PostDescarga
} from "@/utils/request"

import {
    DownloadPedidoApi
} from "@/services/download"

import {
    LeftCircleTwoTone
} from "@ant-design/icons-vue"

import axios from "axios"

import dayjs from "dayjs"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    setup() {

        const date = ref(dayjs())

        const onSelect = value => {

            date.value = value
        }

        return {
            date,
            onSelect
        }
    },

    methods: {

        async doChangeDownload() {

            try {

                const { body, config } = PostDescarga({ FECHA: this.date.format("YYYY-MM-DD") })

                const response = await axios.post(DownloadPedidoApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "text/csv" })

                saveAs(blob, `PEDIDOS-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.xlsx`)

                getSuccess("Descargando")

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        }
    },

    components: {
        Footer,
        Navbar,
        LeftCircleTwoTone
    }
};
</script>