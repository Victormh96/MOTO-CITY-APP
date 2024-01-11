<template>
    <!--Button-->
    <a-button class="button-default mb-3" @click="showModal()">
        NUEVO DOCUMENTO
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="700px" :destroyOnClose="true" :maskClosable="false" :footer="null"
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

                        <!--Group-->
                        <a-form-item label="Plantilla:" v-bind="validateInfos.PLANTILLA">

                            <!--Select-->
                            <a-select v-model:value="formstate.PLANTILLA" show-search :options="dataSourcePl"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Nombre:" v-bind="validateInfos.NOMBRE">

                            <!--Input-->
                            <a-input v-model:value="formstate.NOMBRE" @change="doChangeLetter('NOMBRE')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Tipo:" v-bind="validateInfos.TIPOPAGO">

                            <!--Select-->
                            <a-select v-model:value="formstate.TIPOPAGO" show-search :options="getTipoPago"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Entregado Por:" v-bind="validateInfos.ENTREGADO">

                            <!--Input-->
                            <a-input v-model:value="formstate.ENTREGADO" @change="doChangeLetter('ENTREGADO')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Cantidad:" v-bind="validateInfos.VALOR">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.VALOR">

                                <!--Template-->
                                <template #addonBefore>$</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Comentario:" v-bind="validateInfos.COMENTARIO">

                            <!--Textarea-->
                            <a-textarea v-model:value="formstate.COMENTARIO" :rows="6" show-count :maxlength="175"
                                @change="doChangeLetter('COMENTARIO')" />
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
                        Completar
                    </a-button>
                </a-popconfirm>

                <!--Popconfirm-->
                <a-popconfirm title="¿Limpiar campos?" ok-text="Si" cancel-text="No" @confirm="doChangeFieldClear">

                    <!--Button-->
                    <a-button class="button-siguiente">
                        Limpiar
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
    PostRecibo,
    getPlantilla
} from "@/utils/request"

import {
    getTipoPago
} from "@/utils/data"

import {
    Form
} from "ant-design-vue"

import {
    PostReciboApi,
    ShowPlantillaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"

export default {
    data() {
        return {
            getTipoPago,
            loading: false,

            dataSourcePl: []
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla('RB')

            const plantilla = await axios.post(ShowPlantillaApi, body, config)

            this.dataSourcePl = plantilla?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getResponse(err)
        }
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

            PLANTILLA: null,

            NOMBRE: null,

            VALOR: null,

            TIPOPAGO: null,

            ENTREGADO: null,

            COMENTARIO: null
        })

        const rules = reactive({

            PLANTILLA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            NOMBRE: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            VALOR: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            TIPOPAGO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            ENTREGADO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            COMENTARIO: [
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

        const filterOption = (input, option) => option.label.toLowerCase().includes(input.toLowerCase())

        return {
            visible,
            onClose,
            validate,
            showModal,
            formstate,
            filterOption,
            validateInfos
        }
    },

    methods: {

        doChangeValidacion() {

            this.validate().then(() => {

                this.doChangeAdd()

            }).catch(err => {

                console.log('error', err)
            })
        },

        async doChangeAdd() {

            try {

                const { body, config } = PostRecibo(this.formstate)

                const response = await axios.post(PostReciboApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `RECIBO-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 600)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangeLetter(item) {

            this.formstate[item] = this.formstate[item].toUpperCase()
        },

        doChangeFieldClear() {

            const exclude = ['PLANTILLA']

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    }
};
</script>