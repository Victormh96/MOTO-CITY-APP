<template>
    <!--Button-->
    <a-button class="button-default mb-3" @click="showModal()">
        NUEVO DOCUMENTO
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="900px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" centered :class="!loading ? 'loading' : null">

        <!--Icon-->
        <i type="button" class="fa-solid fa-xmark" @click="onClose"></i>

        <!--Layout-->
        <div v-if="(loading)">

            <!--Container-->
            <div class="container mb-3">

                <!--Step-->
                <a-steps :current="current" :percent="doChangePorcentaje()">

                    <!--Enlace-->
                    <a-step v-for="item in steps" :key="item?.title" :title="item?.title" />
                </a-steps>
            </div>

            <!--Container-->
            <div class="container mb-3 pb-2">

                <!--Form-->
                <a-form layout="vertical" :model="formstate" class="formulario">

                    <!--Row-->
                    <a-row :gutter="[24, 24]" v-if="current === 0">

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Plantilla:" v-bind="validateInfos.PLANTILLA">

                                <!--Select-->
                                <a-select v-model:value="formstate.PLANTILLA" show-search :options="dataSourcePl"
                                    :filter-option="filterOption" @change="doChangeDisabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Nombre:" v-bind="validateInfos.NOMBRE">

                                <!--Input-->
                                <a-input v-model:value="formstate.NOMBRE" @change="doChangeLetter('NOMBRE')"
                                    :disabled="disabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Profesion:" v-bind="validateInfos.PROFESION">

                                <!--Select-->
                                <a-select v-model:value="formstate.PROFESION" show-search :options="getProfesion"
                                    :filter-option="filterOption" :disabled="disabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Dui:" v-bind="validateInfos.DUI">

                                <!--Input-->
                                <a-input type="tel" v-model:value="formstate.DUI" v-mask="'########-#'"
                                    :disabled="disabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Departamento:" v-bind="validateInfos.DEPARTAMENTO">

                                <!--Select-->
                                <a-select v-model:value="formstate.DEPARTAMENTO" show-search @change="doChangeMunicipio"
                                    :options="getDepartamento" :filter-option="filterOption" :disabled="disabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Municipio:" v-bind="validateInfos.MUNICIPIO">

                                <!--Select-->
                                <a-select v-model:value="formstate.MUNICIPIO" show-search :options="dataSourceMn"
                                    :filter-option="filterOption" :disabled="disabled" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Precio Venta:" v-bind="validateInfos.PRECIO">

                                <!--Input-->
                                <a-input-number type="tel" v-model:value="formstate.PRECIO" :min="1" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <!--Row-->
                    <a-row :gutter="[24, 24]" v-if="current === 1">

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Poliza:" v-bind="validateInfos.POLIZA">

                                <!--Input-->
                                <a-input-number type="tel" v-model:value="formstate.POLIZA">

                                    <!--Template-->
                                    <template #addonBefore>4-</template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Año:" v-bind="validateInfos.ANIO">

                                <!--Select-->
                                <a-select v-model:value="formstate.ANIO" show-search :options="getAnio"
                                    :filter-option="filterOption" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Marca:" v-bind="validateInfos.MARCA">

                                <!--Select-->
                                <a-select v-model:value="formstate.MARCA" show-search @change="doChangeModelo"
                                    :options="getMarca" :filter-option="filterOption" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Modelo:" v-bind="validateInfos.MODELO">

                                <!--Select-->
                                <a-select v-model:value="formstate.MODELO" show-search :options="dataSourceMd"
                                    :filter-option="filterOption" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                            <!--Group-->
                            <a-form-item label="Color:" v-bind="validateInfos.COLOR">

                                <!--Select-->
                                <a-select v-model:value="formstate.COLOR" show-search :options="getColor"
                                    :filter-option="filterOption" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                            <!--Group-->
                            <a-form-item label="Tipo:" v-bind="validateInfos.TIPO">

                                <!--Input-->
                                <a-input v-model:value="formstate.TIPO" @change="doChangeLetter('TIPO')" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Numero Motor:" v-bind="validateInfos.NUMEROMOTOR">

                                <!--Input-->
                                <a-input v-model:value="formstate.NUMEROMOTOR" @change="doChangeLetter('NUMEROMOTOR')" />
                            </a-form-item>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24">

                            <!--Group-->
                            <a-form-item label="Numero Chasis:" v-bind="validateInfos.NUMEROCHASIS">

                                <!--Input-->
                                <a-input v-model:value="formstate.NUMEROCHASIS" @change="doChangeLetter('NUMEROCHASIS')" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>

            <!--Container-->
            <div class="container">

                <!--Div-->
                <div class="steps-action formulario">

                    <!--Button-->
                    <a-button v-if="current < steps.length - 1" @click="next(); doChangeScrollto()"
                        class="button-completar me-3 mb-3">
                        Siguiente
                    </a-button>

                    <!--Popconfirm-->
                    <a-popconfirm title="¿Completar proceso?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion"
                        v-if="current === steps.length - 1">

                        <!--Button-->
                        <a-button class="button-completar me-3 mb-3">
                            Completar
                        </a-button>
                    </a-popconfirm>

                    <!--Button-->
                    <a-button v-if="current > 0" @click="prev(); doChangeScrollto()" class="button-siguiente">
                        Volver
                    </a-button>

                    <!--Popconfirm-->
                    <a-popconfirm title="¿Limpiar campos?" ok-text="Si" cancel-text="No" @confirm="doChangeFieldClear"
                        v-if="current === 0">

                        <!--Button-->
                        <a-button class="button-siguiente">
                            Limpiar
                        </a-button>
                    </a-popconfirm>
                </div>
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
    getAnio,
    getColor,
    getMarca,
    getModelo,
    getMunicipio,
    getProfesion,
    getDepartamento
} from "@/utils/data"

import {
    getClose,
    getCreate,
    getSuccess,
    getPlantilla
} from "@/utils/index"

import {
    Form
} from "ant-design-vue"

import {
    GetPlantillaApi,
    PostCompraVentaApi
} from "@/services/paths"

import {
    isValidDUI
} from "@avalontechsv/idsv"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"
import store from "@/store"

export default {
    data() {
        return {
            loading: false,
            disabled: false,

            getAnio,
            getColor,
            getMarca,
            getModelo,
            getMunicipio,
            getProfesion,
            getDepartamento,

            dataSourceMn: [],
            dataSourceMd: [],
            dataSourcePl: [],

            steps: [

                { title: 'DATO' },

                { title: 'MOTO' }
            ]
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla('CV')

            const plantilla = await axios.post(GetPlantillaApi, body, config)

            this.dataSourcePl = plantilla?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            store.dispatch("CuentaCerrar")

            getClose('Sesión cerrada')
        }
    },

    setup() {

        const current = ref(0)

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

            PROFESION: null,

            DEPARTAMENTO: null,

            MUNICIPIO: null,

            DUI: null,

            PRECIO: null,

            POLIZA: null,

            MARCA: null,

            MODELO: null,

            ANIO: null,

            COLOR: null,

            NUMEROMOTOR: null,

            NUMEROCHASIS: null,

            TIPO: 'URBANO'
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

            PRECIO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            POLIZA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            MARCA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            MODELO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            ANIO: [
                {
                    required: true,

                    message: "Campo Requerido"
                },
                {
                    min: 4,

                    message: "Minimo 4 caracteres"
                }
            ],

            COLOR: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            NUMEROMOTOR: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            NUMEROCHASIS: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            TIPO: [
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

        const next = () => {

            const fieldsToValidate = ['PLANTILLA', 'NOMBRE', 'PROFESION', 'DEPARTAMENTO', 'MUNICIPIO', 'DUI', 'PRECIO']

            validate(fieldsToValidate).then(() => {

                current.value++

            }).catch(err => {

                console.log('error', err)
            })
        }

        const prev = () => {

            current.value--
        }

        const filterOption = (input, option) => option.label.toLowerCase().includes(input.toLowerCase())

        return {
            next,
            prev,
            onClose,
            visible,
            current,
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

                const { body, config } = getCreate(this.formstate)

                const response = await axios.post(PostCompraVentaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `COMPRA-VENTA-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 600)

            } catch (err) {

                console.error(err)

                store.dispatch("CuentaCerrar")

                getClose('Sesión cerrada')
            }
        },

        doChangeDisabled(value, option) {

            if (value == 13) {
                this.steps = [

                    { title: 'DATO' },

                    { title: 'FORMA PAGO' },

                    { title: 'MOTO' }
                ]
            }



            if (value > 2) {

                this.formstate.NOMBRE = option?.label

                this.formstate.PROFESION = ' '

                this.formstate.DEPARTAMENTO = ' '

                this.formstate.MUNICIPIO = ' '

                this.formstate.DUI = '00000000-0'

                this.disabled = true

            } else {

                const exclude = ['TIPO', 'PLANTILLA', 'PRECIO']

                Object.keys(this.formstate)

                    .filter(key => !exclude.includes(key))

                    .forEach(key => {

                        this.formstate[key] = null
                    })

                this.disabled = false
            }
        },

        doChangePorcentaje() {

            if (this.current === 0) return 50

            return ((this.current + 1) / 2) * 100
        },

        doChangeMunicipio() {

            this.formstate.MUNICIPIO = null

            const data = getMunicipio.filter(item => item.departamento === this.formstate.DEPARTAMENTO)

            this.dataSourceMn = data
        },

        doChangeModelo() {

            this.formstate.MODELO = null

            const data = getModelo.filter(item => item.marca === this.formstate.MARCA)

            this.dataSourceMd = data
        },

        doChangeLetter(item) {

            this.formstate[item] = this.formstate[item].toUpperCase()
        },

        doChangeFieldClear() {

            const exclude = ['TIPO']

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        },

        doChangeScrollto() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            })
        }
    }
};
</script>