<template>
    <!--Flex-->
    <a-flex gap="small" justify="flex-start">

        <!--Upload-->
        <a-upload name="file" :customRequest="doChangeUpload" :beforeUpload="doChangeValidacion" :max-count="1"
            accept=".xlsx">

            <!--Button-->
            <a-button class="go-button mb-3">
                REGISTRAR
            </a-button>
        </a-upload>

        <!--Picker-->
        <a-date-picker v-model:value="DocDate" picker="month" :allowClear="false" class="month"/>
    </a-flex>
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

import dayjs from "dayjs"

export default {
    data() {
        return {
            DocDate: dayjs()
        }
    },

    methods: {

        async doChangeValidacion(file) {

            const xlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

            !xlsx ? getWarning("Se admite el formato .xlsx") : ""

            return xlsx
        },

        async doChangeUpload({ file, onSuccess, onError }) {

            try {

                const formData = new FormData()

                formData.append("file", file)

                formData.append("DocDate", this.DocDate)

                const { config } = getToken()

                const response = await axios.post(PostMetaVentapi, formData, config)

                getSuccess("Cargado")

                onSuccess(response.data)

                setTimeout(function () { location.reload() }, 400)

            } catch (err) {

                if (err.response?.data?.status === true) {

                    getWarning(err.response?.data?.message)

                } else {

                    getResponse(err)
                }

                console.error(err)

                onError(err)
            }
        }
    }
};
</script>