<template>
    <!--Button-->
    <a-button class="button-default mb-3" @click="showModal">
        NUEVO DOCUMENTO
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="600px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" centered>

        <!--Icon-->
        <i type="button" class="fa-solid fa-xmark fa-beat" @click="onClose"></i>

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
                    <a-form-item label="Año:">

                        <!--Input-->
                        <a-input :value="new Date().getFullYear().toString()" disabled />
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
                    <a-form-item label="Profesion:" v-bind="validateInfos.PROFESION">

                        <!--Select-->
                        <a-select v-model:value="formstate.PROFESION" show-search :options="getProfesion"
                            :filter-option="filterOption" />
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
    getProfesion,
    getDepartamento
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    getPlantilla,
    PostPrimeraMatricula
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    ShowPlantillaApi,
    PostPrimeraMatriculaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"

export default {
    data() {
        return {
            download: false,

            getMunicipio,
            getProfesion,
            getDepartamento,

            dataSourceMn: [],
            dataSourcePl: []
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla("PM")

            const plantilla = await axios.post(ShowPlantillaApi, body, config)

            this.dataSourcePl = plantilla?.data

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

            PLANTILLA: 14,

            NOMBRE: null,

            PROFESION: null,

            DEPARTAMENTO: null,

            MUNICIPIO: null,

            DUI: null
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

            PROFESION: [
                {
                    required: true,

                    message: "Campo Requerido"
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

            DUI: [
                {
                    validator: async () => {

                        const { DUI } = formstate

                        if ((isValidDUI(DUI) == false || DUI?.length < 10) && DUI?.length > 0) {

                            return Promise.reject(

                                new Error("Formato Incorrecto")
                            )

                        }
                    }
                },
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

                console.log("error", err)
            })
        },

        async doChangeAdd() {

            this.download = true

            try {

                const { body, config } = PostPrimeraMatricula(this.formstate)

                const response = await axios.post(PostPrimeraMatriculaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                saveAs(blob, `PRIMERA-MATRICULA-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

                setTimeout(function () { location.reload() }, 300)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
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

            const exclude = ["PLANTILLA"]

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    }
};
</script>