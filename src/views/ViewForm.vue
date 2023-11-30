<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3 mb-xl-4 mt-2">

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
                        <a-form-item label="Nombre:" v-bind="validateInfos.NOMBRE">

                            <!--Input-->
                            <a-input v-model:value="formstate.NOMBRE" @change="doChangeLetter('NOMBRE')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Edad:" v-bind="validateInfos.EDAD">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.EDAD" v-mask="'##'" :min="2" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Dui:" v-bind="validateInfos.DUI">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.DUI" v-mask="'########-#'" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Departamento:" v-bind="validateInfos.DEPARTAMENTO">

                            <!--Select-->
                            <a-select v-model:value="formstate.DEPARTAMENTO" show-search @change="doChangeMunicipio"
                                :options="getDepartamento" :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Municipio:" v-bind="validateInfos.MUNICIPIO">

                            <!--Select-->
                            <a-select v-model:value="formstate.MUNICIPIO" show-search :options="dataSourceMn"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Profesion:" v-bind="validateInfos.PROFESION">

                            <!--Select-->
                            <a-select v-model:value="formstate.PROFESION" show-search :options="getProfesion"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Monto:" v-bind="validateInfos.MONTO">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.MONTO" :min="1" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Plazo:" v-bind="validateInfos.PLAZO">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.PLAZO" :min="3" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Interes:" v-bind="validateInfos.INTERES">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.INTERES" :min="1" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Cuota:" v-bind="validateInfos.CUOTA">

                            <!--Input-->
                            <a-input-number v-model:value="formstate.CUOTA" :min="3" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Cuota Monto:" v-bind="validateInfos.CANTIDAD">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.CANTIDAD" :min="1" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <!--Row-->
                <a-row :gutter="[24, 16]" v-if="current === 1">

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

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
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Año:" v-bind="validateInfos.ANIO">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.ANIO" placeholder="YYYY" v-mask="'####'" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Marca:" v-bind="validateInfos.MARCA">

                            <!--Input-->
                            <a-input v-model:value="formstate.MARCA" @change="doChangeLetter('MARCA')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Modelo:" v-bind="validateInfos.MODELO">

                            <!--Input-->
                            <a-input v-model:value="formstate.MODELO" @change="doChangeLetter('MODELO')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                        <!--Group-->
                        <a-form-item label="Color:" v-bind="validateInfos.COLOR">

                            <!--Input-->
                            <a-input v-model:value="formstate.COLOR" @change="doChangeLetter('COLOR')" />
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

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Numero VIN:" v-bind="validateInfos.NUMEROVIN">

                            <!--Input-->
                            <a-input v-model:value="formstate.NUMEROVIN" @change="doChangeLetter('NUMEROVIN')" />
                        </a-form-item>
                    </a-col>


                </a-row>
            </a-form>
        </div>

        <!--Container-->
        <div class="container mb-3">

            <!--Div-->
            <div class="steps-action formulario">

                <!--Button-->
                <a-button v-if="current < steps.length - 1" @click="next(); doChangeScrollto()"
                    class="completar mb-4 mb-md-0 me-0 me-md-4">
                    Siguiente
                </a-button>

                <!--Popconfirm-->
                <a-popconfirm title="¿Completar proceso?" ok-text="Si" cancel-text="No" @confirm="doChangeAdd"
                    v-if="current === steps.length - 1">

                    <!--Button-->
                    <a-button class="completar mb-4 mb-md-0 me-0 me-md-4">
                        Completar
                    </a-button>
                </a-popconfirm>

                <!--Button-->
                <a-button v-if="current > 0" @click="prev(); doChangeScrollto()" class="siguiente">
                    Volver
                </a-button>

                <!--Popconfirm-->
                <a-popconfirm title="¿Limpiar campos?" ok-text="Si" cancel-text="No" @confirm="doChangeFieldClear"
                    v-if="current === 0">

                    <!--Button-->
                    <a-button class="siguiente">
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
    isDUI
} from "sivar-utils"

import {
    getMunicipio,
    getProfesion,
    getDepartamento
} from "@/utils/data"

import {
    getToken,
    getError,
    getLetter
} from "@/utils/index"

import {
    Form
} from "ant-design-vue"

import {
    PostMutuoPrendarioApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import router from "@/router"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            getMunicipio,
            getProfesion,
            getDepartamento,

            dataSourceMn: [],
            dataSourceMd: [],

            steps: [

                { title: 'DATO' },

                { title: 'MOTO' }
            ]
        }
    },

    async created() {

        setTimeout(() => {

            this.loading = true

        }, 950)
    },

    setup() {

        const current = ref(0)

        const formstate = reactive({

            NOMBRE: null,

            EDAD: null,

            PROFESION: null,

            DEPARTAMENTO: null,

            MUNICIPIO: null,

            DUI: null,

            MONTO: null,

            PLAZO: null,

            CUOTA: null,

            CANTIDAD: null,

            INTERES: null,

            POLIZA: null,

            MARCA: null,

            MODELO: null,

            ANIO: null,

            COLOR: null,

            NUMEROMOTOR: null,

            NUMEROCHASIS: null,

            NUMEROVIN: null,

            TIPO: 'URBANO'
        })

        const rules = reactive({

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

            EDAD: [
                {
                    required: true,

                    message: "Campo Requerido"
                },
                {
                    min: 2,

                    message: "Minimo 2 caracteres"
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

                        if (isDUI(DUI) == false && DUI !== null && DUI !== '') {

                            return Promise.reject(

                                new Error("Formato Incorrecto")
                            )
                        }
                    }
                }
            ],

            MONTO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            PLAZO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            CUOTA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            CANTIDAD: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            INTERES: [
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

            NUMEROVIN: [
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

            const fieldsToValidate = ['NOMBRE', 'EDAD', 'PROFESION', 'DEPARTAMENTO', 'MUNICIPIO', 'DUI', 'MONTO', 'PLAZO', 'CUOTA', 'CANTIDAD', 'INTERES']

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

                const { record } = getToken(this.formstate)

                const response = await axios.post(PostMutuoPrendarioApi, record)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `CV${this.formstate?.DUI}`)

                this.doChangeFieldClear

                router.push('/')

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