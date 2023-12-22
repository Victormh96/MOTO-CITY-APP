<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3">

            <!--Step-->
            <a-steps :current="current" :percent="doChangePorcentaje()">

                <!--Enlace-->
                <a-step v-for="item in steps" :key="item?.title" :title="item?.title" />
            </a-steps>
        </div>

        <!--Container-->
        <div class="container mb-4 pb-2">

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
                    class="button-completar mb-4 mb-md-0 me-0 me-md-4">
                    Siguiente
                </a-button>

                <!--Popconfirm-->
                <a-popconfirm title="¿Completar proceso?" ok-text="Si" cancel-text="No" @confirm="doChangeAdd"
                    v-if="current === steps.length - 1">

                    <!--Button-->
                    <a-button class="button-completar mb-4 mb-md-0 me-0 me-md-4">
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
    </a-layout-content>

    <!--Layout-->
    <a-layout-content class="loading d-flex" v-else>

        <!--Container-->
        <div class="container d-flex justify-content-center align-items-center">

            <!--Spin-->
            <a-spin size="large" />
        </div>
    </a-layout-content>

    <!--Footer-->
    <Footer />
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
    getAnio,
    getColor,
    getMarca,
    getModelo,
    getMunicipio,
    getProfesion,
    getDepartamento
} from "@/utils/data"

import {
    getToken,
    getError,
    getLetter,
    getCreate,
    getWarning
} from "@/utils/index"

import {
    Form
} from "ant-design-vue"

import {
    GetPlantillaApi,
    PostCompraVentaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
//import router from "@/router"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

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

            const { config } = getToken()

            const plantilla = await axios.get(GetPlantillaApi, config)

            this.dataSourcePl = plantilla?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            this.loading = false

            getWarning(err.response?.data?.mensaje)
        }
    },

    setup() {

        const current = ref(1)

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
                },
                {
                    min: 8,

                    message: "Minimo 8 caracteres"
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
            current,
            validate,
            formstate,
            filterOption,
            validateInfos
        }
    },

    methods: {

        async doChangeAdd() {

            try {

                const { body, config } = getCreate(this.formstate)

                const response = await axios.post(PostCompraVentaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `COMPRA-VENTA-${this.formstate?.DUI}`)

                //this.doChangeFieldClear

                //router.push('/')

            } catch (err) {

                console.error(err)

                getError(err)
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

            this.formstate[item] = getLetter(this.formstate[item])
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
    },

    components: {
        Footer,
        Navbar
    }
};
</script>