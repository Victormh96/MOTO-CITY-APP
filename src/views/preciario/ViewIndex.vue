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
                                    <a-button class="button-completar" :loading="download">
                                        Completar
                                    </a-button>
                                </a-popconfirm>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" :xxl="15" :xxxl="14" class="preciario">

                    <!--Img-->
                    <img src="@/../public/img/preciario.gif" class="img-preciario">
                </a-col>
            </a-row>
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

import {
    GetPreciarioApi,
    PostPreciarioApi
} from "@/services/paths"

const useForm = Form.useForm

import axios from "axios"
import dayjs from "dayjs"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,
            download: false,

            getmes,
            dataSourcePc: [],
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

        doChangeValidacion() {

            this.validate().then(async () => {

                await this.doChangeAdd()

            }).catch(err => {

                console.log('error', err)
            })
        },

        async doChangeAdd() {

            this.download = true

            try {

                const { body, config } = PostPreciario(this.formstate)

                const response = await axios.post(PostPreciarioApi, body, config)

                const blob = new Blob(

                    [response.data],

                    { type: 'application/pdf' })

                saveAs(blob, `PRECIARIO-${dayjs().format('YYYY-MM-DD HH_mm_ss')}`)

                getSuccess('Descargando')

                setTimeout(function () { location.reload() }, 500)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }

            this.download = false
        },

        doChangePreciario(targetKeys, direction, moveKeys) {

            if (direction === 'right') {

                const data = targetKeys.map(key => this.dataSourcePc.find(object => object.key === key))

                this.formstate.PRECIARIO = data

            } else if (direction === 'left') {

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