<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">
            <a-form layout="vertical" :model="formstate" class="formulario mb-3 pb-2">
                <!--Row-->
                <a-row :gutter="[24, 24]">

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Plantilla:" v-bind="validateInfos.PLANTILLA">

                            <!--Select-->
                            <a-select v-model:value="formstate.PLANTILLA" show-search :options="getSociedad"
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
                    <a-col :span="12">

                        <!--Group-->
                        <a-form-item label="Valor:" v-bind="validateInfos.VALOR">

                            <!--Input-->
                            <a-input v-model:value="formstate.VALOR" @change="doChangeLetter('VALOR')" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="12">

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
                        <a-form-item label="Comentario:" v-bind="validateInfos.COMENTARIO">

                            <!--Select-->
                            <a-input v-model:value="formstate.ENTREGADO" @change="doChangeLetter('COMENTARIO')" />
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
    getSociedad,
    getTipoPago
} from "@/utils/data"

import {
    getResponse
} from "@/utils/index"

import {
    getToken
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    GetPrimeraMatriculaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            getSociedad,
            getTipoPago,
            loading: false,

            dataSourcePm: [],

            pagination: {

                pageSize: 20,

                showSizeChanger: false,

                onChange: this.doChangeScrollto
            }
        }
    },

    async created() {

        try {

            const { body, config } = getToken()

            const primeramatricula = await axios.post(GetPrimeraMatriculaApi, body, config)

            this.dataSourcePm = primeramatricula?.data

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

            VALOR: null,

            TIPOPAGO: null,

            ENTREGADO: null,

            COMENTARIO: null,
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
                },
            ]
        })

        const {

            validate,

            validateInfos,

        } = useForm(formstate, rules)

        const nextDato = () => {

            const field = ['PLANTILLA', 'NOMBRE', 'VALOR', 'TIPOPAGO', 'ENTREGADO', 'COMENTARIO']

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
            showModal,
            formstate,
            filterOption,
            validateInfos
        }
    },


    methods: {

        doChangeScrollto() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            })
        }
    },

    components: {
        Footer,
        Navbar,
    }
};
</script>