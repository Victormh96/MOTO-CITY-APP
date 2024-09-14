<template>
    <!--Button-->
    <a-button :disabled="download || (this.record?.imprimir === 0)" @click="doChangeDownload">
        IMPRESION
    </a-button>
</template>

<!--=======Script=======-->
<script>
import {
    PrintReciboApi
} from "@/services"

import {
    getLoading,
    getResponse,
    getDownload
} from "@/utils/index"

import {
    PostDescarga
} from "@/utils/request"

import axios from "axios"

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

                getLoading("Imprimiendo", "download")

                const { body, config } = PostDescarga(this.record)

                const response = await axios.post(PrintReciboApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                const blobUrl = URL.createObjectURL(blob)

                const iframe = document.createElement("iframe")

                iframe.style.display = "none"

                document.body.appendChild(iframe)

                iframe.src = blobUrl

                await new Promise(resolve => setTimeout(resolve, 5000))

                iframe.contentWindow.print()

                URL.revokeObjectURL(blobUrl)

                const closeDialog = setInterval(() => {

                    if (document.hasFocus()) {

                        clearInterval(closeDialog)

                        location.reload()
                    }

                }, 200)

                getDownload("Generado", "download")

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