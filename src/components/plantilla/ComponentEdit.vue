<template>
    <!--Button-->
    <a-button class="button-default" @click="showModal(); doChangePlantilla()">
        EDITAR
    </a-button>

    <!--Modal-->
    <a-modal v-model:visible="visible" width="800px" :destroyOnClose="true" :maskClosable="false" :footer="null"
        :keyboard="false" centered :class="!loading ? 'loading' : null">

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
                        <a-form-item label="Contenido:" v-bind="validateInfos.CONTENIDO">

                 
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
    getCreate,
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    Form
} from "ant-design-vue"

import {
    PutPlantillaApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"

export default {
    data() {
        return {
            loading: false,
            customToolbar: [

                ["bold", "italic", "underline"],

                [{ list: "ordered" }, { list: "bullet" }],

                [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],

                [{ indent: "-1" }, { indent: "+1" }],

                ["clean"]
            ]
        }
    },

    async created() {

        setTimeout(() => { this.loading = true }, 850)
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

            ID: null,

            NOMBRE: null,

            CONTENIDO: null
        })

        const rules = reactive({

            NOMBRE: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            CONTENIDO: [
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

        return {
            onClose,
            visible,
            validate,
            showModal,
            formstate,
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

                const { body, config } = getCreate(this.formstate)

                await axios.post(PutPlantillaApi, body, config)

                getSuccess('Editado')

                setTimeout(function () { location.reload() }, 500)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangePlantilla() {

            this.formstate.ID = this.record?.id

            this.formstate.NOMBRE = this.record?.nombre

            this.formstate.CONTENIDO = this.record?.contenido
        },

        doChangeLetter(item) {

            this.formstate[item] = this.formstate[item].toUpperCase()
        },

        doChangeFieldClear() {

            Object.keys(this.formstate)

                .forEach(key => {

                    this.formstate[key] = null
                })
        }
    },

    components: {

    },

    props: ["record"]
};
</script>