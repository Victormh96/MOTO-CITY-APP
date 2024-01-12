<template>
    <!--Button-->
    <a-button class="button-default" @click="showModal(); doChangeUsuario()">
        EDITAR
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="700px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" :class="!loading ? 'loading' : null" centered>

        <!--Icon-->
        <i type="button" class="fa-solid fa-xmark fa-beat" @click="onClose"></i>

        <!--Layout-->
        <div v-if="(loading)">

            <!--Form-->
            <a-form layout="vertical" :model="formstate" class="formulario mb-3 pb-2">

                <!--Row-->
                <a-row :gutter="[24, 24]">

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
                        <a-form-item label="Usuario:">

                            <!--Input-->
                            <a-input v-model:value="formstate.USUARIO" disabled />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Password:" v-bind="validateInfos.PASSWORD">

                            <!--Input-->
                            <a-input-password type="password" v-model:value="formstate.PASSWORD" placeholder="••••••••" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Sucursal:" v-bind="validateInfos.SUCURSAL">

                            <!--Select-->
                            <a-select v-model:value="formstate.SUCURSAL" show-search :options="dataSourceSc"
                                :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Rol:" v-bind="validateInfos.ROL">

                            <!--Select-->
                            <a-select v-model:value="formstate.ROL" :options="getRol" :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>

                    <!--Col-->
                    <a-col :span="24">

                        <!--Group-->
                        <a-form-item label="Estado:" v-bind="validateInfos.ESTADO">

                            <!--Select-->
                            <a-select v-model:value="formstate.ESTADO" :options="getEstado" :filter-option="filterOption" />
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
    getRol,
    getEstado
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    getToken,
    PostUsuario
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    PutUsuarioApi,
    GetSucursalApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"

export default {
    data() {
        return {
            loading: false,

            getRol,
            getEstado,
            dataSourceSc: []
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

            NOMBRE: null,

            USUARIO: null,

            PASSWORD: null,

            ROL: null,

            SUCURSAL: null,

            ESTADO: null
        })

        const rules = reactive({

            NOMBRE: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            PASSWORD: [
                {
                    min: 8,

                    message: "Minimo 8 caracteres",

                    trigger: "blur"
                }
            ],

            ROL: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            SUCURSAL: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            ESTADO: [
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
            onClose,
            visible,
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

                this.doChangeUpdate()

            }).catch(err => {

                console.log('error', err)
            })
        },

        async doChangeUpdate() {

            try {

                const { body, config } = PostUsuario(this.formstate)

                await axios.post(PutUsuarioApi, body, config)

                getSuccess('Guardado')

                setTimeout(function () { location.reload() }, 500)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        async doChangeUsuario() {

            try {

                const { config } = getToken()

                const sucursal = await axios.get(GetSucursalApi, config)

                this.dataSourceSc = sucursal?.data

                this.formstate.ID = this.record?.id

                this.formstate.NOMBRE = this.record?.nombre

                this.formstate.USUARIO = this.record?.usuario

                this.formstate.ROL = this.record?.rol

                this.formstate.SUCURSAL = this.record?.sucursal

                this.formstate.ESTADO = this.record?.estado === true ? 1 : 0

                this.loading = true

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangeLetter(item) {

            this.formstate[item] = this.formstate[item].toUpperCase()
        }
    },

    props: ["record"]
};
</script>