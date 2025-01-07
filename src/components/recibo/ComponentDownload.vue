<template>
    <!--Button-->
    <a-button :disabled="download" @click="doChangeDownload">

        <!--Icon-->
        <SaveTwoTone two-tone-color="#db2d3f" />
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
} from "@/utils"

import {
    PostDescarga
} from "@/utils/request"

import {
    DownloadReciboApi
} from "@/services/download"

import {
    SaveTwoTone
} from "@ant-design/icons-vue"

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

                const response = await axios.post(DownloadReciboApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                saveAs(blob, `RECIBO-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
        }
    },

    components: {
        SaveTwoTone
    },

    props: ["record"]
};
</script>