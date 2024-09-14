<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out">

        <!--Container-->
        <div class="container mb-3">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :span="24">

                    <!--Calendar-->
                    <a-calendar :value="date" @select="onSelect" />

                    <!--Popconfirm-->
                    <a-popconfirm title="¿Generar documento?" ok-text="Si" cancel-text="No" @confirm="doChangeDownload">

                        <!--Button-->
                        <a-button class="accion-button blue">
                            DESCARGAR
                        </a-button>
                    </a-popconfirm>
                </a-col>
            </a-row>
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
    saveAs
} from "file-saver"

import {
    DownloadPedidoApi
} from "@/services"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    PostDescarga
} from "@/utils/request"

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

                saveAs(blob, `PEDIDOS-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.csv`)

                getSuccess("Descargando")

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        }
    },

    components: {
        Footer,
        Navbar
    }
};
</script>