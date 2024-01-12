<template>
    <!--Button-->
    <a-button class="button-default mb-3" @click="showModal()">
        GENERAR REPORTE
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="500px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" centered :class="!loading ? 'loading' : null">

        <!--Icon-->
        <i type="button" class="fa-solid fa-xmark fa-beat" @click="onClose"></i>

        <!--Div-->
        <div v-if="(loading)">

            <!--Form-->
            <a-form layout="vertical" :model="formstate" class="formulario mb-3 pb-2">

                <!--Row-->
                <a-row :gutter="[24, 24]">

                    <!--Col-->
                    <a-col :span="24">

                        <a-form-item label="Fecha:" v-bind="validateInfos.FECHA">

                            <!--Picker-->
                            <a-range-picker v-model:value="formstate.FECHA" :placeholder="['DESDE', 'HASTA']" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <!--Div-->
            <div class="steps-action formulario">

                <!--Popconfirm-->
                <a-popconfirm title="¿Completar proceso?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

                    <!--Button-->
                    <a-button class="button-completar me-3">
                        Generar
                    </a-button>
                </a-popconfirm>
            </div>
        </div>

        <!--Container-->
        <div class="container d-flex justify-content-center align-items-center" v-else>

            <!--Spin-->
            <a-spin size="large" />
        </div>
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
    TriggerReciboApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"

export default {
    data() {
        return {
            loading: false
        }
    },

    async created() {

        setTimeout(() => { this.loading = true }, 850)
    },

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

        doChangeValidacion() {

            this.validate().then(() => {

                this.doChangeDownload()

            }).catch(err => {

                console.log('error', err)
            })
        },

        async doChangeDownload() {

            try {

                const { body, config } = PostDescarga(this.formstate)

                const response = await axios.post(TriggerReciboApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

                saveAs(blob, `RECIBO-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 600)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        }
    }
};
</script>