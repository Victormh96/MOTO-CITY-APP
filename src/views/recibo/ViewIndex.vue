<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3">

            <!--Form-->
            <a-form layout="vertical" :model="formstate" class="formulario mb-3 pb-2">
                <!--Row-->
                <a-row :gutter="[24, 24]">

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Sociedad:" v-bind="validateInfos.SOCIEDAD">

                            <!--Select-->
                            <a-select v-model:value="formstate.SOCIEDAD" show-search :options="getSociedad"
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
                        <a-form-item label="Tipo Pago:" v-bind="validateInfos.TIPOPAGO">

                            <!--Select-->
                            <a-select v-model:value="formstate.TIPOPAGO" show-search :options="getTipoPago"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Entregado por:" v-bind="validateInfos.ENTREGADO">

                            <!--Input-->
                            <a-input v-model:value="formstate.ENTREGADO" @change="doChangeLetter('ENTREGADO')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Valor:" v-bind="validateInfos.VALOR">

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
                            <a-textarea v-model:value="formstate.COMENTARIO" :rows="7"
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
    reactive
} from "vue"

import {
    saveAs
} from "file-saver"

import {
    getSociedad,
    getTipoPago
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    PostRecibo
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    PostReciboApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            getSociedad,
            getTipoPago,
            loading: false
        }
    },

    async created() {

        setTimeout(() => { this.loading = true }, 850)
    },

    setup() {

        const formstate = reactive({

            SOCIEDAD: null,

            NOMBRE: null,

            VALOR: null,

            TIPOPAGO: null,

            ENTREGADO: null,

            COMENTARIO: null
        })

        const rules = reactive({

            SOCIEDAD: [
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
                },
            ]
        })

        const {

            validate,

            validateInfos,

        } = useForm(formstate, rules)

        const filterOption = (input, option) => option.label.toLowerCase().includes(input.toLowerCase())

        return {
            validate,
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

            const exclude = ['SOCIEDAD']

            Object.keys(this.formstate)

                .filter(key => !exclude.includes(key))

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    },

    components: {
        Footer,
        Navbar
    }
};
</script>