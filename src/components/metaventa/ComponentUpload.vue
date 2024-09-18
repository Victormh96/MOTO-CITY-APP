<template>
    <!--Upload-->
    <a-upload name="file" :customRequest="doChangeUpload" :beforeUpload="doChangeValidacion" :multiple="false"
        accept=".xlsx">

        <!--Button-->
        <a-button class="go-button mb-3">
            SUBIR EXCEL
        </a-button>
    </a-upload>
</template>

<!--=======Script=======-->
<script>
import {
    PostMetaVentapi
} from "@/services"

import {
    getSuccess,
    getWarning,
    getResponse
} from "@/utils/index"

import {
    getToken
} from "@/utils/request"

import axios from "axios"

export default {
    methods: {

        async doChangeValidacion(file) {

            const xlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

            !xlsx ? getWarning("Se admite el formato .xlsx") : ""

            return xlsx
        },

        async doChangeUpload(file) {

            try {

                const formData = new FormData()

                formData.append("file", file)

                const { config } = getToken()

                const response = await axios.post(PostMetaVentapi, formData, config)

                getSuccess("Cargado")


                setTimeout(function () { location.reload() }, 300)

            } catch (err) {

                console.error(err)

                getResponse(err)


            }
        }
    }
};
</script>