<template>
    <!--Button-->
    <a-button class="go-button mb-3" @click="showModal">
        NUEVA PLANTILLA
    </a-button>

    <!--Modal-->
    <a-modal v-model:open="visible" width="580px" :destroyOnClose="true" :maskClosable="false" :footer="null"
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
                    <a-form-item label="Estado:" v-bind="validateInfos.ESTADO">

                        <!--Select-->
                        <a-select v-model:value="formstate.ESTADO" :options="getEstado" />
                    </a-form-item>
                </a-col>

                <!--Col-->
                <a-col :span="24">

                    <!--Group-->
                    <a-form-item label="Contenido:" v-bind="validateInfos.CONTENIDO">

                        <!--Froala-->
                        <froala :config="config" v-model:value="formstate.CONTENIDO" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <!--Popconfirm-->
        <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No" @confirm="doChangeValidacion">

            <!--Button-->
            <a-button class="accion-button blue">
                COMPLETAR
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
    PostPlantillaApi
} from "@/services"

import {
    getEstado
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    PostPlantilla
} from "@/utils/request"

import {
    Form
} from "ant-design-vue"

const useForm = Form.useForm

import axios from "axios"

export default {
    data() {
        return {
            getEstado,

            config: {

                toolbarButtons: {

                    moreText: {

                        buttons: ["bold", "fontSize", "italic", "underline", "clearFormatting"],

                        buttonsVisible: 0
                    },

                    moreParagraph: {

                        buttons: ["alignLeft", "alignCenter", "alignRight", "alignJustify", "outdent", "indent"],

                        buttonsVisible: 0
                    },

                    moreRich: {

                        buttons: ["insertTable", "formatOL", "formatUL"],

                        buttonsVisible: 0
                    },

                    moreMisc: {

                        buttons: ["undo", "redo", "fullscreen"],

                        align: "right",

                        buttonsVisible: 3
                    },

                    quickInsertEnabled: false,

                    events: {

                        initialized: function () {

                            console.log("initialized")
                        }
                    }
                }
            }
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

            ESTADO: null,

            CONTENIDO: null
        })

        const rules = reactive({

            NOMBRE: [
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

        async doChangeValidacion() {

            try {

                await this.validate()

                await this.doChangeAdd()

            } catch (err) {

                console.error(err)
            }
        },

        async doChangeAdd() {

            try {

                const { body, config } = PostPlantilla(this.formstate)

                await axios.post(PostPlantillaApi, body, config)

                getSuccess("Guardado")

                setTimeout(function () { location.reload() }, 400)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangeLetter(key, event) {

            const cursorPosition = event.target.selectionStart

            this.formstate[key] = event.target.value.toUpperCase()

            this.$nextTick(() => event.target.setSelectionRange(cursorPosition, cursorPosition))
        }
    }
};
</script>