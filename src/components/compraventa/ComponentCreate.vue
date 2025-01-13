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

        <!--Step-->
        <a-steps :current="current" :percent="doChangePorcentaje()" class="mb-3">

            <!--Enlace-->
            <a-step v-for="item in steps" :key="item?.title" :title="item?.title" />
        </a-steps>

        <!--Form-->
        <a-form layout="vertical" :model="formstate" class="mb-3 pb-2">

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
                        <a-select v-model:value="formstate.PROFESION" show-search :options="dataSourcePf"
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
                        <a-select v-model:value="formstate.DEPARTAMENTO" show-search @change="doChangeDistrito"
                            :options="dataSourceDp" :filter-option="filterOption" :disabled="disabled" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Municipio:" v-bind="validateInfos.DISTRITO">

                        <!--Select-->
                        <a-select v-model:value="formstate.DISTRITO" show-search @change="doChangeMunicipio"
                            :options="dataSourceMn" :filter-option="filterOption" :disabled="disabled" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Precio Venta:" v-bind="validateInfos.PRECIO">

                        <!--Input-->
                        <a-input-number type="tel" v-model:value="formstate.PRECIO" :min="1" :disabled="declaracion" />
                    </a-form-item>
                </a-col>
            </a-row>

            <!--Row-->
            <a-row :gutter="[24, 24]" v-if="current === 1">

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item :label="[10, 24, 25].includes(formstate.PLANTILLA) ? 'Placa:' : 'Poliza:'"
                        v-bind="validateInfos.POLIZA">

                        <!--Input-->
                        <a-input-number type="tel" v-model:value="formstate.POLIZA">

                            <!--Template-->
                            <template #addonBefore>
                                {{ [10, 24, 25].includes(formstate.PLANTILLA) ? 'M-' : '4-' }}
                            </template>

                            <!--Template-->
                            <template #addonAfter
                                v-if="[10, 24, 25].includes(formstate.PLANTILLA) ? true : false">-2011</template>
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
                        <a-select v-model:value="formstate.MARCA" @change="doChangeModelo" :options="getMarca" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Modelo:" v-bind="validateInfos.MODELO">

                        <!--Select-->
                        <a-select v-model:value="formstate.MODELO" show-search :options="dataSourceMd"
                            :filter-option="filterOption" @change="doChangeColor" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                    <!--Group-->
                    <a-form-item label="Color:" v-bind="validateInfos.COLOR">

                        <!--Select-->
                        <a-select v-model:value="formstate.COLOR" :options="dataSourceCl" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" :xxxl="12">

                    <!--Group-->
                    <a-form-item label="Tipo:" v-bind="validateInfos.TIPO">

                        <!--Select-->
                        <a-select v-model:value="formstate.TIPO" :options="getTipoMoto" />
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
                        <a-select v-model:value="formstate.DEPARTAMENTOF" show-search @change="doChangeDistritoF"
                            :options="dataSourceDp" :filter-option="filterOption" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Municipio:" v-bind="validateInfos.DISTRITOF">

                        <!--Select-->
                        <a-select v-model:value="formstate.DISTRITOF" show-search @change="doChangeMunicipioF"
                            :options="dataSourceFMn" :filter-option="filterOption" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <!--Flex-->
        <a-flex gap="small">

            <!--Button-->
            <a-button v-if="current === 0 && formstate.PLANTILLA != 29" @click="nextDato" class="accion-button blue">
                SIGUIENTE
            </a-button>

            <!--Button-->
            <a-button v-if="current === 1 && steps.length === 3" @click="nextMoto" class="accion-button blue">
                SIGUIENTE
            </a-button>

            <!--Popconfirm-->
            <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion"
                v-if="current === steps.length - 1">

                <!--Button-->
                <a-button class="accion-button blue">
                    COMPLETAR
                </a-button>
            </a-popconfirm>

            <!--Button-->
            <a-button v-if="current > 0" @click="prev" class="accion-button aqua">
                VOLVER
            </a-button>
        </a-flex>
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
    getAnio,
    getColor,
    getMarca,
    getModelo,
    getTipoMoto
} from "@/utils/data"

import {
    getPlantilla,
    PostCompraVenta
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

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

import {
    PostCompraVentaApi
} from "@/services/compraventa"

const useForm = Form.useForm

import axios from "axios"

import dayjs from "dayjs"

export default {
    data() {
        return {
            prima: false,

            disabled: false,

            profesion: false,

            vencimiento: false,

            declaracion: false,

            getAnio,

            getColor,

            getMarca,

            getModelo,

            getTipoMoto,

            dataSourceMn: [],

            dataSourceMd: [],

            dataSourcePl: [],

            dataSourceCl: [],

            dataSourceFMn: [],

            dataSourcePf: tools()?.profesion,

            dataSourceDp: tools()?.departamento,

            steps: [

                { title: "DATO" },

                { title: "MOTO" }
            ]
        }
    },

    async created() {

        try {

            const { body, config } = getPlantilla("CV")

            const plantilla = await axios.post(ShowPlantillaApi, body, config)

            this.dataSourcePl = plantilla?.data

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

            DISTRITO: null,

            DUI: null,

            PRECIO: null,

            POLIZA: null,

            MARCA: null,

            MODELO: null,

            ANIO: null,

            COLOR: null,

            NUMEROMOTOR: null,

            NUMEROCHASIS: null,

            TIPO: "URBANO",

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

            DISTRITOF: null,

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

            DISTRITO: [
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

            DISTRITOF: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            DUIF: [
                {
                    validator: async () => {

                        const { DUIF } = formstate

                        if ((isValidDUI(DUIF ? DUIF : 0) == false || DUIF?.length < 10) && DUIF?.length > 0) {

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

        const nextDato = () => {

            const field = ["PLANTILLA", "NOMBRE", "PROFESION", "DEPARTAMENTO", "DISTRITO", "DUI", "PRECIO"]

            validate(field).then(() => {

                current.value++

            }).catch(err => {

                console.error(err)
            })
        }

        const nextMoto = () => {

            const field = ["POLIZA", "MARCA", "MODELO", "ANIO", "COLOR", "NUMEROMOTOR", "NUMEROCHASIS", "TIPO"]

            validate(field).then(() => {

                current.value++

            }).catch(err => {

                console.error(err)
            })
        }

        const prev = () => {

            current.value--
        }

        const filterOption = (input, option) => option.label?.toLowerCase()?.includes(input.toLowerCase())

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

        async doChangeValidacion() {

            let field = []

            if (this.steps[0]?.title === "DATO" && this.formstate.PLANTILLA === 29) {
                console.log('1')
                field = ["PLANTILLA", "NOMBRE", "PROFESION", "DEPARTAMENTO", "DISTRITO", "DUI", "PRECIO"]

            } else if (this.steps[2]?.title === "PAGO") {
                console.log('2')
                field = ["MESES", "VENCIMIENTO", "PRIMERACUOTA", "DIAPAGO", "CUOTA", "PRECIOCUOTA"]

            } else if (this.steps[2]?.title === "FIRMA") {
                console.log('3')
                field = ["NOMBREF", "DUIF", "DEPARTAMENTOF", "DISTRITOF"]

            } else {
                console.log('YES')
                field = ["POLIZA", "MARCA", "MODELO", "ANIO", "COLOR", "NUMEROMOTOR", "NUMEROCHASIS", "TIPO"]
            }

            try {

                await this.validate(field)

                await this.doChangeAdd()

            } catch (err) {

                console.error(err)
            }
        },

        async doChangeAdd() {

            try {

                const { body, config } = PostCompraVenta(this.formstate)

                const response = await axios.post(PostCompraVentaApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: "application/pdf" })

                saveAs(blob, `COMPRA-VENTA-${dayjs().format("YYYY-MM-DD HH_mm_ss")}`)

                getSuccess("Descargando")

                setTimeout(function () { location.reload() }, 400)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangeReplace(value, option) {

            if ([1, 10, 12, 13, 9, 18, 22, 25, 29].includes(value)) {

                this.doChangeFieldClear()

                this.disabled = false

            } else {

                this.doChangeFieldClear()

                const fields = ["NOMBRE", "PROFESION", "DUI", "DEPARTAMENTO", "DISTRITO"]

                for (const field of fields) {

                    this.formstate[field] = field === "DUI" ? "00000000-0" : field === "NOMBRE" ? option?.label : " "
                }

                this.disabled = true
            }

            if ([13, 18, 22].includes(value)) {

                this.prima = false

            } else {

                this.prima = true

                this.formstate.PRIMA = 0
            }

            if ([9].includes(value)) {

                this.profesion = true

                this.formstate.PROFESION = " "

            } else {

                this.profesion = false
            }

            if ([18, 22].includes(value)) {

                this.vencimiento = true

            } else {

                this.vencimiento = false
            }

            if ([29].includes(value)) {

                this.declaracion = true

                this.formstate.PRECIO = 0

            } else {

                this.declaracion = false
            }

            this.steps = [

                { title: "DATO" },

                ...([29].includes(value) ? [] : [{ title: "MOTO" }]),

                ...([12, 13, 18, 22].includes(value) ? [{ title: "PAGO" }] : []),

                ...([9].includes(value) ? [{ title: "FIRMA" }] : [])
            ]
        },

        doChangePorcentaje() {

            if (this.current === 0) return (100 / this.steps.length)

            return ((this.current + 1) / this.steps.length) * 100
        },

        doChangeMunicipio() {

            this.formstate.MUNICIPIO = null

            const data = tools()?.municipio.filter(item => item.value === this.formstate.DISTRITO)

            this.formstate.MUNICIPIO = data[0]?.municipio
        },

        doChangeDistrito() {

            this.formstate.DISTRITO = null

            const data = tools()?.municipio.filter(item => item.departamento === this.formstate.DEPARTAMENTO)

            this.dataSourceMn = data
        },

        doChangeMunicipioF() {

            this.formstate.MUNICIPIOF = null

            const data = tools()?.municipio.filter(item => item.value === this.formstate.DISTRITOF)

            this.formstate.MUNICIPIOF = data[0]?.municipio
        },

        doChangeDistritoF() {

            this.formstate.DISTRITOF = null

            const data = tools()?.municipio.filter(item => item.departamento === this.formstate.DEPARTAMENTOF)

            this.dataSourceFMn = data
        },

        doChangeModelo() {

            this.formstate.MODELO = null

            const data = getModelo.filter(item => item.marca === this.formstate.MARCA)

            this.dataSourceMd = data
        },

        doChangeColor() {

            this.formstate.COLOR = null

            const data = getColor.filter(item => item.modelo === this.formstate.MODELO)

            this.dataSourceCl = data
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
        },

        doChangeFieldClear() {

            const exclude = ["PLANTILLA", "TIPO", "VENCIMIENTO", "PRIMERACUOTA"]

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    },

    components: {
        PlusCircleTwoTone
    }
};
</script>