<template>
    <!--Group-->
    <a-float-button-group shape="circle">

        <!--Float-->
        <a-float-button tooltip="DESCARGAR" @click="showModal()">

            <!--Template-->
            <template #icon>

                <!--Icono-->
                <DownloadOutlined />
            </template>
        </a-float-button>
    </a-float-button-group>

    <!--Modal-->
    <a-modal v-model:open="visible" width="350px" class="cargando" :footer="false" centered>

        <!--Form-->
        <a-form layout="vertical" :model="formstate">

            <!--Item-->
            <a-form-item v-bind="validateInfos.FECHA">

                <!--Picker-->
                <a-range-picker v-model:value="formstate.FECHA" :placeholder="['DESDE', 'HASTA']" :allowClear="false"
                    class="mb-4" />
            </a-form-item>
        </a-form>

        <!--Popconfirm-->
        <a-popconfirm title="¿Completar proceso?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

            <!--Button-->
            <a-button class="accion-button blue">
                COMPLETAR
            </a-button>
        </a-popconfirm>
    </a-modal>
</template>

<!--=======Script=======-->
<script>
import {
    ref,
    reactive
} from "vue"

import {
    saveAs
} from "file-saver"

import {
    ReportReciboApi
} from "@/services"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    PostDescarga
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    DownloadOutlined
} from "@ant-design/icons-vue"

const useForm = Form.useForm

import axios from "axios"

import dayjs from "dayjs"

export default {
    setup() {

        const visible = ref(false)

        const showModal = () => {

            visible.value = true

            history.pushState({ estado: true }, "")

            window.addEventListener("popstate", onClose)
        }

        const onClose = () => {

            visible.value = false

            history.replaceState(history.state, "", window.location.pathname)

            window.removeEventListener("popstate", onClose)
        }

        const formstate = reactive({

            FECHA: null
        })

        const rules = reactive({

            FECHA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ]
        })

        const {

            validate,

            validateInfos,

        } = useForm(formstate, rules)

        return {
            visible,
            onClose,
            validate,
            showModal,
            formstate,
            validateInfos
        }
    },

    methods: {

        async doChangeValidacion() {

            try {

                await this.validate()

                await this.doChangeDownload()

            } catch (err) {

                console.error(err)
            }
        },

        async doChangeDownload() {

            try {

                const { body, config } = PostDescarga(this.formstate)

                const response = await axios.post(ReportReciboApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

                saveAs(blob, `RECIBO-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

                setTimeout(function () { location.reload() }, 300)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        }
    },

    components: {
        DownloadOutlined
    }
};
</script>