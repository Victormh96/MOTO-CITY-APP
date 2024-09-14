<template>
    <!--Button-->
    <a-button :disabled="download" @click="doChangeDownload">
        DESCARGAR
    </a-button>
</template>

<!--=======Script=======-->
<script>
import {
    saveAs
} from "file-saver"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    PostDescarga
} from "@/utils/request"

import {
    DownloadCompraVentaApi
} from "@/services"

import axios from "axios"

import dayjs from "dayjs"

export default {
    data() {
        return {
            download: false
        }
    },

    methods: {

        async doChangeDownload() {

            this.download = true

            try {

                const { body, config } = PostDescarga(this.record)

                const response = await axios.post(DownloadCompraVentaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                saveAs(blob, `COMPRA-VENTA-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
        }
    },

    props: ["record"]
};
</script>