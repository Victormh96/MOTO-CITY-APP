<template>
    <!--Button-->
    <a-button @click="showModal(); doChangeUsuario()">

        <!--Icon-->
        <EditTwoTone two-tone-color="#db2d3f" />
    </a-button>

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
                    <a-form-item label="Nombre:" v-bind="validateInfos.NOMBRE">

                        <!--Input-->
                        <a-input v-model:value="formstate.NOMBRE" @input="doChangeLetter('NOMBRE', $event)" />
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

        <!--Popconfirm-->
        <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

            <!--Button-->
            <a-button class="accion-button blue">
                ACTUALIZAR
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
    getRol,
    getEstado
} from "@/utils/data"

import {
    PostUsuario
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

import {
    PutUsuarioApi
} from "@/services/usuario"

import {
    EditTwoTone
} from "@ant-design/icons-vue"

const useForm = Form.useForm

import axios from "axios"

export default {
    data() {
        return {
            getRol,

            getEstado
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

        const filterOption = (input, option) => option.label?.toLowerCase()?.includes(input.toLowerCase())

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

        async doChangeValidacion() {

            try {

                await this.validate()

                await this.doChangeUpdate()

            } catch (err) {

                console.error(err)
            }
        },

        async doChangeUpdate() {

            try {

                const { body, config } = PostUsuario(this.formstate)

                await axios.post(PutUsuarioApi, body, config)

                getSuccess("Actualizado")

                setTimeout(function () { location.reload() }, 400)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        async doChangeUsuario() {

            this.formstate.ID = this.record?.id

            this.formstate.NOMBRE = this.record?.nombre

            this.formstate.USUARIO = this.record?.usuario

            this.formstate.PASSWORD = this.record?.password

            this.formstate.ROL = this.record?.rol

            this.formstate.SUCURSAL = this.record?.sucursal

            this.formstate.ESTADO = this.record?.estado === true ? 1 : 0
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
        }
    },

    components: {
        EditTwoTone
    },

    props: ["record", "dataSourceSc"]
};
</script>