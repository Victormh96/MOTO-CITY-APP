<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">

            <!--Page-->
            <a-page-header title="COMPRAVENTA" @back="() => $router.push('/')">

                <!--Template-->
                <template #backIcon>

                    <!--Icon-->
                    <LeftCircleTwoTone two-tone-color="#db2d3f" />
                </template>
            </a-page-header>

            <!--Component-->
            <Crear />

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceCv" :columns="column" bordered
                :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'nombre'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.nombre }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'precio'">
                        {{ doChangeDollar(record?.precio) }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'n_motor'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.n_motor }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'n_chasis'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.n_chasis }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'acciones'">

                        <!--Component-->
                        <Download :record="record" />
                    </template>
                </template>

                <!--Template-->
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, column }">

                    <!--Input-->
                    <a-input type="search" placeholder="..." :value="selectedKeys[0]" ref="focusearch"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                </template>
            </a-table>
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
    ref,
    toRefs,
    reactive
} from "vue"

import {
    getResponse
} from "@/utils"

import {
    getToken
} from "@/utils/request"

import {
    LeftCircleTwoTone
} from "@ant-design/icons-vue"

import {
    GetCompraVentaApi
} from "@/services/compraventa"

import axios from "axios"

import numeral from "numeral"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

import Crear from "@/components/compraventa/ComponentCreate.vue"

import Download from "@/components/compraventa/ComponentDownload.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceCv: [],

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

            const compraventa = await axios.post(GetCompraVentaApi, body, config)

            this.dataSourceCv = compraventa?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getResponse(err)
        }
    },

    setup() {

        const focusearch = ref()

        const state = reactive({

            searchText: "",

            searchedColumn: ""
        })

        const column = [{

            title: "PLANTILLA",

            dataIndex: "plantilla",

            key: "plantilla",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.plantilla?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {

            title: "NOMBRE",

            dataIndex: "nombre",

            key: "nombre",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.nombre?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "MODELO",

            dataIndex: "modelo",

            key: "modelo",

            align: "center"
        },
        {
            title: "MOTOR",

            dataIndex: "n_motor",

            key: "n_motor",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.n_motor?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "CHASIS",

            dataIndex: "n_chasis",

            key: "n_chasis",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.n_chasis?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "PRECIO",

            dataIndex: "precio",

            key: "precio",

            align: "center"
        },
        {
            title: "CREADO",

            dataIndex: "creado",

            key: "creado",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.creado?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "",

            dataIndex: "acciones",

            key: "acciones",

            align: "center",

            width: 50
        }]

        const handleSearch = (selectedKeys, confirm, dataIndex) => {

            confirm()

            state.searchText = selectedKeys[0]

            state.searchedColumn = dataIndex
        }

        return {
            column,
            focusearch,
            handleSearch,
            ...toRefs(state)
        }
    },

    methods: {

        doChangeDollar(number) {

            return numeral(number).format("$0,0.00")
        },

        doChangeScrollto() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            })
        }
    },

    components: {
        Crear,
        Footer,
        Navbar,
        Download,
        LeftCircleTwoTone
    }
};
</script>