<template>
    <!--Button-->
    <a-button class="button-default mb-3" @click="showModal()">
        NUEVO DOCUMENTO
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="600px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" :class="!loading ? 'loading' : null" centered>

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
                            <a-input v-model:value="formstate.NOMBRE" @input="doChangeLetter('NOMBRE', $event)" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Dui:" v-bind="validateInfos.DUI">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.DUI" v-mask="'########-#'" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Departamento:" v-bind="validateInfos.DEPARTAMENTO">

                            <!--Select-->
                            <a-select v-model:value="formstate.DEPARTAMENTO" show-search @change="doChangeMunicipio"
                                :options="getDepartamento" :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Municipio:" v-bind="validateInfos.MUNICIPIO">

                            <!--Select-->
                            <a-select v-model:value="formstate.MUNICIPIO" show-search :options="dataSourceMn"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Fecha Pago:" v-bind="validateInfos.FECHAPAGO">

                            <!--Picker-->
                            <a-date-picker v-model:value="formstate.FECHAPAGO" placeholder="YYYY-MM-DD"
                                @change="doChangeCalcular" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Dia:" v-bind="validateInfos.DIA">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.DIA" readonly />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Credito:" v-bind="validateInfos.CREDITO">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.CREDITO">

                                <!--Template-->
                                <template #addonBefore>$</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <!--Div-->
            <div class="steps-action formulario">

                <!--Popconfirm-->
                <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

                    <!--Button-->
                    <a-button class="button-completar me-3" :loading="download">
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
    isValidDUI
} from "@avalontechsv/idsv"

import {
    getMunicipio,
    getDepartamento
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    getPlantilla,
    PostPagare
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    PostPagareApi,
    ShowPlantillaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"

export default {
    data() {
        return {
            loading: false,
            download: false,

            getMunicipio,
            getDepartamento,

            dataSourceMn: [],
            dataSourcePl: []
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla('PG')

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

            PLANTILLA: 15,

            NOMBRE: null,

            DUI: null,

            DEPARTAMENTO: null,

            MUNICIPIO: null,

            FECHAPAGO: null,

            DIA: null,

            CREDITO: null
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

            DUI: [
                {
                    required: true,

                    message: "Campo Requerido"
                },
                {
                    validator: async () => {

                        const { DUI } = formstate

                        if (isValidDUI(DUI) == false && DUI !== null && DUI !== '') {

                            return Promise.reject(

                                new Error("Formato Incorrecto")
                            )
                        }
                    }
                }
            ],

            DEPARTAMENTO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            MUNICIPIO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            FECHAPAGO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DIA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            CREDITO: [
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

            this.download = true

            try {
                const { body, config } = PostPagare(this.formstate)

                const response = await axios.post(PostPagareApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `PAGARE-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 500)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
        },

        doChangeCalcular() {

            const fechapago = new Date(this.formstate.FECHAPAGO ?? 0)

            const date = fechapago - new Date()

            this.formstate.DIA = Math.ceil(date / (1000 * 60 * 60 * 24))
        },

        doChangeMunicipio() {

            this.formstate.MUNICIPIO = null

            const data = getMunicipio.filter(item => item.departamento === this.formstate.DEPARTAMENTO)

            this.dataSourceMn = data
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
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