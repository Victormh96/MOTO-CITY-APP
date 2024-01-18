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

        <!--Layout-->
        <div v-if="(loading)">

            <!--Step-->
            <a-steps :current="current" :percent="doChangePorcentaje()" class="mb-3">

                <!--Enlace-->
                <a-step v-for="item in steps" :key="item?.title" :title="item?.title" />
            </a-steps>

            <!--Form-->
            <a-form layout="vertical" :model="formstate" class="formulario mb-3 pb-2">

                <!--Row-->
                <a-row :gutter="[24, 24]" v-if="current === 0">

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Plantilla:" v-bind="validateInfos.PLANTILLA">

                            <!--Select-->
                            <a-select v-model:value="formstate.PLANTILLA" show-search :options="dataSourcePl"
                                :filter-option="filterOption" @change="doChangeReplace" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Nombre:" v-bind="validateInfos.NOMBRE">

                            <!--Input-->
                            <a-input v-model:value="formstate.NOMBRE" @input="doChangeLetter('NOMBRE', $event)"
                                :disabled="disabled" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Profesion:" v-bind="validateInfos.PROFESION">

                            <!--Select-->
                            <a-select v-model:value="formstate.PROFESION" show-search :options="getProfesion"
                                :filter-option="filterOption" :disabled="disabled || profesion" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Dui:" v-bind="validateInfos.DUI">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.DUI" v-mask="'########-#'" :disabled="disabled" />
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
                        <a-form-item :label="formstate.PLANTILLA === 10 ? 'Placa:' : 'Poliza:'"
                            v-bind="validateInfos.POLIZA">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.POLIZA">

                                <!--Template-->
                                <template #addonBefore>{{ formstate.PLANTILLA === 10 ? 'M-' : '4-' }}</template>
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
                            <a-input v-model:value="formstate.TIPO" @input="doChangeLetter('TIPO', $event)" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Numero Motor:" v-bind="validateInfos.NUMEROMOTOR">

                            <!--Input-->
                            <a-input v-model:value="formstate.NUMEROMOTOR" @input="doChangeLetter('NUMEROMOTOR', $event)" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Numero Chasis:" v-bind="validateInfos.NUMEROCHASIS">

                            <!--Input-->
                            <a-input v-model:value="formstate.NUMEROCHASIS"
                                @input="doChangeLetter('NUMEROCHASIS', $event)" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <!--Row-->
                <a-row :gutter="[24, 24]" v-if="current === 2 && this.steps[2]?.title === 'PAGO'">

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Meses:" v-bind="validateInfos.MESES">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.MESES">

                                <!--Template-->
                                <template #addonBefore>MM</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Prima:" v-bind="validateInfos.PRIMA">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.PRIMA" :disabled="prima">

                                <!--Template-->
                                <template #addonBefore>$</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Vencimiento:" v-bind="validateInfos.VENCIMIENTO">

                            <!--Picker-->
                            <a-date-picker v-model:value="formstate.VENCIMIENTO" placeholder="YYYY-MM-DD"
                                :disabled="vencimiento" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Primera Cuota:" v-bind="validateInfos.PRIMERACUOTA">

                            <!--Picker-->
                            <a-date-picker v-model:value="formstate.PRIMERACUOTA" placeholder="YYYY-MM-DD" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Dia Pago:" v-bind="validateInfos.DIAPAGO">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.DIAPAGO">

                                <!--Template-->
                                <template #addonBefore>DD</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Cuotas:" v-bind="validateInfos.CUOTA">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.CUOTA">

                                <!--Template-->
                                <template #addonBefore>N°</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Precio Cuota:" v-bind="validateInfos.PRECIOCUOTA">

                            <!--Input-->
                            <a-input-number type="tel" v-model:value="formstate.PRECIOCUOTA">

                                <!--Template-->
                                <template #addonBefore>$</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                </a-row>

                <!--Row-->
                <a-row :gutter="[24, 24]" v-if="current === 2 && this.steps[2]?.title === 'FIRMA'">

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Nombre:" v-bind="validateInfos.NOMBREF">

                            <!--Input-->
                            <a-input v-model:value="formstate.NOMBREF" @input="doChangeLetter('NOMBREF', $event)" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Dui:" v-bind="validateInfos.DUIF">

                            <!--Input-->
                            <a-input type="tel" v-model:value="formstate.DUIF" v-mask="'########-#'" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Departamento:" v-bind="validateInfos.DEPARTAMENTOF">

                            <!--Select-->
                            <a-select v-model:value="formstate.DEPARTAMENTOF" show-search @change="doChangeMunicipioF"
                                :options="getDepartamento" :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Municipio:" v-bind="validateInfos.MUNICIPIOF">

                            <!--Select-->
                            <a-select v-model:value="formstate.MUNICIPIOF" show-search :options="dataSourceFMn"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <!--Div-->
            <div class="steps-action formulario">

                <!--Button-->
                <a-button v-if="current === 0" @click="nextDato()" class="button-completar me-3">
                    Siguiente
                </a-button>

                <!--Button-->
                <a-button v-if="current === 1 && steps.length === 3" @click="nextMoto()" class="button-completar me-3">
                    Siguiente
                </a-button>

                <!--Popconfirm-->
                <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion"
                    v-if="current === steps.length - 1">

                    <!--Button-->
                    <a-button class="button-completar me-3" :loading="download">
                        Completar
                    </a-button>
                </a-popconfirm>

                <!--Button-->
                <a-button v-if="current > 0" @click="prev()" class="button-siguiente">
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
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    getPlantilla,
    PostCompraVenta
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    ShowPlantillaApi,
    PostCompraVentaApi
} from "@/services/paths"

import {
    isValidDUI
} from "@avalontechsv/idsv"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"

export default {
    data() {
        return {
            prima: false,
            loading: false,
            disabled: false,
            download: false,
            profesion: false,
            vencimiento: false,

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
            dataSourceFMn: [],

            steps: [

                { title: 'DATO' },

                { title: 'MOTO' }
            ]
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla('CV')

            const plantilla = await axios.post(ShowPlantillaApi, body, config)

            this.dataSourcePl = plantilla?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getResponse(err)
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

            TIPO: 'URBANO',

            MESES: null,

            PRIMA: null,

            VENCIMIENTO: dayjs(),

            PRIMERACUOTA: dayjs(),

            DIAPAGO: null,

            CUOTA: null,

            PRECIOCUOTA: null,

            NOMBREF: null,

            DEPARTAMENTOF: null,

            MUNICIPIOF: null,

            DUIF: null
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
            ],

            MESES: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            PRIMA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            VENCIMIENTO: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            PRIMERACUOTA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DIAPAGO: [
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

            PRECIOCUOTA: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            NOMBREF: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DEPARTAMENTOF: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            MUNICIPIOF: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DUIF: [
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
            ]
        })

        const {

            validate,

            validateInfos,

        } = useForm(formstate, rules)

        const nextDato = () => {

            const field = ['PLANTILLA', 'NOMBRE', 'PROFESION', 'DEPARTAMENTO', 'MUNICIPIO', 'DUI', 'PRECIO']

            validate(field).then(() => {

                current.value++

            }).catch(err => {

                console.log('error', err)
            })
        }

        const nextMoto = () => {

            const field = ['POLIZA', 'MARCA', 'MODELO', 'ANIO', 'COLOR', 'NUMEROMOTOR', 'NUMEROCHASIS', 'TIPO']

            validate(field).then(() => {

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
            prev,
            onClose,
            visible,
            current,
            validate,
            nextDato,
            nextMoto,
            showModal,
            formstate,
            filterOption,
            validateInfos
        }
    },

    methods: {

        doChangeValidacion() {

            let field = []

            if (this.steps[2]?.title === 'PAGO') {

                field = ['MESES', 'VENCIMIENTO', 'PRIMERACUOTA', 'DIAPAGO', 'CUOTA', 'PRECIOCUOTA']

            } else if (this.steps[2]?.title === 'FIRMA') {

                field = ['NOMBREF', 'DUIF', 'DEPARTAMENTOF', 'MUNICIPIOF']

            } else {

                field = ['POLIZA', 'MARCA', 'MODELO', 'ANIO', 'COLOR', 'NUMEROMOTOR', 'NUMEROCHASIS', 'TIPO']
            }

            this.validate(field).then(() => {

                this.doChangeAdd()

            }).catch(err => {

                console.log('error', err)
            })
        },

        async doChangeAdd() {

            this.download = true

            try {

                const { body, config } = PostCompraVenta(this.formstate)

                const response = await axios.post(PostCompraVentaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `COMPRA-VENTA-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 500)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
        },

        doChangeReplace(value, option) {

            if ([1, 10, 12, 13, 9, 18].includes(value)) {

                this.doChangeFieldClear()

                this.disabled = false

            } else {

                this.doChangeFieldClear()

                const fields = ['NOMBRE', 'PROFESION', 'DUI', 'DEPARTAMENTO', 'MUNICIPIO']

                for (const field of fields) {

                    this.formstate[field] = field === 'DUI' ? '00000000-0' : field === 'NOMBRE' ? option?.label : ' '
                }

                this.disabled = true
            }

            if ([13, 18].includes(value)) {

                this.prima = false

            } else {

                this.prima = true

                this.formstate.PRIMA = 0
            }

            if ([9].includes(value)) {

                this.profesion = true

                this.formstate.PROFESION = ' '

            } else {

                this.profesion = false
            }

            if ([18].includes(value)) {

                this.vencimiento = true

            } else {

                this.vencimiento = false
            }

            this.steps = [

                { title: 'DATO' },

                { title: 'MOTO' },

                ...([12, 13, 18].includes(value) ? [{ title: 'PAGO' }] : []),

                ...([9].includes(value) ? [{ title: 'FIRMA' }] : [])
            ]
        },

        doChangePorcentaje() {

            if (this.current === 0) return (100 / this.steps.length)

            return ((this.current + 1) / this.steps.length) * 100
        },

        doChangeMunicipio() {

            this.formstate.MUNICIPIO = null

            const data = getMunicipio.filter(item => item.departamento === this.formstate.DEPARTAMENTO)

            this.dataSourceMn = data
        },

        doChangeMunicipioF() {

            this.formstate.MUNICIPIOF = null

            const data = getMunicipio.filter(item => item.departamento === this.formstate.DEPARTAMENTOF)

            this.dataSourceFMn = data
        },

        doChangeModelo() {

            this.formstate.MODELO = null

            const data = getModelo.filter(item => item.marca === this.formstate.MARCA)

            this.dataSourceMd = data
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
        },

        doChangeFieldClear() {

            const exclude = ['PLANTILLA', 'TIPO', 'VENCIMIENTO', 'PRIMERACUOTA']

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    }
};
</script>