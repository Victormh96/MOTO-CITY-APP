<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid table-diff mb-3">

            <!--Component-->
            <Upload />

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceMv" :columns="column" bordered
                :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'VENDEDOR_NOMBRE'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.VENDEDOR_NOMBRE }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'MetaComercial'">
                        {{ doChangeDollar(record?.MetaComercial) }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'MetaGerencia'">
                        {{ doChangeDollar(record?.MetaGerencia) }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'MetaCOVID19'">
                        {{ doChangeDollar(record?.MetaCOVID19) }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'Fecha'">
                        {{ new Date(record.Fecha)?.toISOString()?.split("T")[0] }}
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
    GetMetaVentaApi
} from "@/services"

import {
    getResponse
} from "@/utils/index"

import {
    getToken
} from "@/utils/request"

import axios from "axios"

import numeral from "numeral"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

import Upload from "@/components/metaventa/ComponentUpload.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceMv: [],

            pagination: {

                pageSize: 20,

                showSizeChanger: false,

                onChange: this.doChangeScrollto
            }
        }
    },

    async created() {

        try {

            const { config } = getToken()

            const metaventa = await axios.get(GetMetaVentaApi, config)

            this.dataSourceMv = metaventa?.data

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

            title: "FECHA",

            dataIndex: "Fecha",

            key: "Fecha",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.Fecha?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "NOMBRE",

            dataIndex: "VENDEDOR_NOMBRE",

            key: "VENDEDOR_NOMBRE",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.VENDEDOR_NOMBRE?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "PDV",

            dataIndex: "PDV",

            key: "PDV",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.PDV?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "Almacen",

            dataIndex: "CodeAlmacen",

            key: "CodeAlmacen",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.CodeAlmacen?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "CATEGORIA",

            dataIndex: "CATEGORIA",

            key: "CATEGORIA",

            align: "center",

            filters: [{

                text: "MOTO",

                value: "MOTO"
            },
            {
                text: "REPUESTOS",

                value: "REPUESTOS"
            },
            {
                text: "SERVICIO MTTO. P",

                value: "SERVICIO MTTO. P"
            }],

            onFilter: (value, record) => record.CATEGORIA?.toString()?.includes(value)
        },
        {
            title: "COMERCIAL",

            dataIndex: "MetaComercial",

            key: "MetaComercial",

            align: "center"

        },
        {
            title: "GERENCIA",

            dataIndex: "MetaGerencia",

            key: "MetaGerencia",

            align: "center"

        },
        {
            title: "CREDICITY",

            dataIndex: "MetaCOVID19",

            key: "MetaCOVID19",

            align: "center"

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
        Upload,
        Footer,
        Navbar
    }
};
</script>