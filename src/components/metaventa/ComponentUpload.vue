<template>
    <!--Upload-->
    <a-upload name="file" :customRequest="doChangeUpload" :beforeUpload="doChangeValidacion" :max-count="1"
        accept=".xlsx">

        <!--Float-->
        <a-float-button tooltip="REGISTRAR">

            <!--Template-->
            <template #icon>

                <!--Icono-->
                <PlusCircleTwoTone two-tone-color="#db2d3f" />
            </template>
        </a-float-button>
    </a-upload>

    <!--Picker-->
    <a-date-picker v-model:value="DocDate" picker="month" :allowClear="false" class="month" :inputReadOnly="true" />
</template>

<!--=======Script=======-->
<script>
import {
    getSuccess,
    getWarning,
    getResponse
} from "@/utils"

import {
    getToken
} from "@/utils/request"

import {
    PostMetaVentapi
} from "@/services/metaventa"

import {
    PlusCircleTwoTone
} from "@ant-design/icons-vue"

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
    },

    components: {
        PlusCircleTwoTone
    }
};
</script>