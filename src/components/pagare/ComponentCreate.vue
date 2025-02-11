<template>
    <!--Float-->
    <a-float-button tooltip="REGISTRAR" @click="showModal">

        <!--Template-->
        <template #icon>

            <!--Icono-->
            <PlusCircleTwoTone two-tone-color="#db2d3f" />
        </template>
    </a-float-button>

    <!--Modal-->
    <a-modal v-model:open="visible" width="450px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" centered>

        <!--Icon-->
        <i type="button" class="fa-solid fa-xmark fa-spin" @click="onClose"></i>

        <!--Form-->
        <a-form layout="vertical" :model="formstate" class="mb-3 pb-2">

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
                        <a-select v-model:value="formstate.DEPARTAMENTO" show-search @change="doChangeDistrito"
                            :options="dataSourceDp" :filter-option="filterOption" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Municipio:" v-bind="validateInfos.DISTRITO">

                        <!--Select-->
                        <a-select v-model:value="formstate.DISTRITO" show-search @change="doChangeMunicipio"
                            :options="dataSourceMn" :filter-option="filterOption" />
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
                        <a-input-number type="tel" v-model:value="formstate.CREDITO" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <!--Popconfirm-->
        <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

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
    getSuccess,
    getResponse
} from "@/utils"

import {
    saveAs
} from "file-saver"

import {
    Form
} from "ant-design-vue"

import {
    getPlantilla,
    PostPagare
} from "@/utils/request"

import {
    PostPagareApi
} from "@/services/pagare"

import {
    isValidDUI
} from "@avalontechsv/idsv"

import {
    ShowPlantillaApi
} from "@/services/plantilla"

import {
    tools
} from "@/store/modules/tools"

import {
    PlusCircleTwoTone
} from "@ant-design/icons-vue"

const useForm = Form.useForm

import axios from "axios"

import dayjs from "dayjs"

export default {
    data() {
        return {
            dataSourceMn: [],

            dataSourcePl: [],

            dataSourceDp: tools()?.departamento
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla("PG")

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

            PLANTILLA: 15,

            NOMBRE: null,

            DUI: null,

            DEPARTAMENTO: null,

            MUNICIPIO: null,

            DISTRITO: null,

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
                    validator: async () => {

                        const { DUI } = formstate

                        if ((isValidDUI(DUI ? DUI : 0) == false || DUI?.length < 10) && DUI?.length > 0) {

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
            ],

            DEPARTAMENTO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DISTRITO: [
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

        const filterOption = (input, option) => option.label?.toLowerCase()?.includes(input.toLowerCase())

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

        async doChangeValidacion() {

            try {

                await this.validate()

                await this.doChangeAdd()

            } catch (err) {

                console.error(err)
            }
        },

        async doChangeAdd() {

            try {
                const { body, config } = PostPagare(this.formstate)

                const response = await axios.post(PostPagareApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                saveAs(blob, `PAGARE-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

                setTimeout(function () { location.reload() }, 400)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangeCalcular() {

            const fechapago = new Date(this.formstate.FECHAPAGO ?? 0)

            const date = fechapago - new Date()

            this.formstate.DIA = Math.ceil(date / (1000 * 60 * 60 * 24))
        },

        doChangeMunicipio() {

            this.formstate.MUNICIPIO = null

            const data = tools()?.municipio.filter(item => item.value === this.formstate.DISTRITO && item.departamento === this.formstate.DEPARTAMENTO)

            this.formstate.MUNICIPIO = data[0]?.municipio
        },

        doChangeDistrito() {

            this.formstate.DISTRITO = null

            const data = tools()?.municipio.filter(item => item.departamento === this.formstate.DEPARTAMENTO)

            this.dataSourceMn = data
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
        }
    },

    components: {
        PlusCircleTwoTone
    }
};
</script>