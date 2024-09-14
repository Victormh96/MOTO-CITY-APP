<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3">

            <!--Row-->
            <a-row :gutter="[{ sm: 0, md: 32 }, 24]">

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" :xxl="9" :xxxl="10">

                    <!--Form-->
                    <a-form layout="vertical" :model="formstate">

                        <!--Row-->
                        <a-row :gutter="[24, 24]">

                            <!--Col-->
                            <a-col :span="24">

                                <!--Group-->
                                <a-form-item label="Plazo:" v-bind="validateInfos.MESES">

                                    <!--Select-->
                                    <a-select v-model:value="formstate.MESES" show-search :options="getmes"
                                        :filter-option="filterOption" />
                                </a-form-item>
                            </a-col>

                            <!--Col-->
                            <a-col :span="24">

                                <!--Group-->
                                <a-form-item label="Moto:" v-bind="validateInfos.KEY">

                                    <!--Transfer-->
                                    <a-transfer v-model:target-keys="formstate.KEY" :data-source="dataSourcePc"
                                        :render="item => item.title" show-search @change="doChangePreciario"
                                        :locale="{ searchPlaceholder: '' }" />
                                </a-form-item>
                            </a-col>

                            <!--Col-->
                            <a-col :span="24">

                                <!--Popconfirm-->
                                <a-popconfirm title="¿Estas seguro?" ok-text="Si" cancel-text="No"
                                    @confirm="doChangeValidacion">

                                    <!--Button-->
                                    <a-button class="accion-button blue">
                                        COMPLETAR
                                    </a-button>
                                </a-popconfirm>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" :xxl="15" :xxxl="14">

                    <!--Img-->
                    <img src="@/assets/img/preciario.gif" class="img-default">
                </a-col>
            </a-row>
        </div>
    </a-layout-content>

    <!--Layout-->
    <a-layout-content v-else>

        <!--Row-->
        <a-row justify="center" align="middle" class="loading">

            <!--Spin-->
            <a-spin size="large" />
        </a-row>
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
    GetPreciarioApi,
    PostPreciarioApi1,
    PostPreciarioApi2
} from "@/services"

import {
    getmes
} from "@/utils/data"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    Form
} from "ant-design-vue"

import {
    getPreciario,
    PostPreciario
} from "@/utils/request"

const useForm = Form.useForm

import axios from "axios"

import dayjs from "dayjs"

import JSZip from "jszip"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            getmes,

            dataSourcePc: []
        }
    },

    async created() {

        try {

            const { body, config } = getPreciario(this.formstate)

            const preciario = await axios.post(GetPreciarioApi, body, config)

            this.dataSourcePc = preciario?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getResponse(err)
        }
    },

    setup() {

        const formstate = reactive({

            MESES: 48,

            KEY: [],

            PRECIARIO: []
        })

        const rules = reactive({

            MESES: [
                {
                    required: true,

                    message: "Campo Requerido"
                }
            ],

            KEY: [
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
            validate,
            formstate,
            filterOption,
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

                const { body, config } = PostPreciario(this.formstate)

                const response1 = await axios.post(PostPreciarioApi1, body, config)

                const response2 = await axios.post(PostPreciarioApi2, body, config)

                const zip = new JSZip()

                zip.file(`PRECIARIO-FRONTAL-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.pdf`, response1.data)

                zip.file(`PRECIARIO-REVERSO-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.pdf`, response2.data)

                const zipBlob = await zip.generateAsync({ type: "blob" })

                saveAs(zipBlob, `PRECIARIO-${dayjs().format("YYYY-MM-DD_HH_mm_ss")}.zip`)

                getSuccess("Descargando")

                setTimeout(async () => { location.reload() }, 300)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

        doChangePreciario(targetKeys, direction, moveKeys) {

            if (direction === "right") {

                const data = targetKeys.map(key => this.dataSourcePc.find(object => object.key === key))

                this.formstate.PRECIARIO = data

            } else if (direction === "left") {

                const data = this.formstate.PRECIARIO.filter(object => !moveKeys.includes(object.key))

                this.formstate.PRECIARIO = data
            }
        }
    },

    components: {
        Footer,
        Navbar
    }
};
</script>