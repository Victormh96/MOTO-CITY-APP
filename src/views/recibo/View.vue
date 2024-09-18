<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">

            <!--Component-->
            <Crear />

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceRb" :columns="column" bordered
                :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'serie'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.serie }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'nombre'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.nombre }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'valor'">
                        {{ doChangeDollar(record?.valor) }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'estado'">

                        <!--Tag-->
                        <a-tag color="error" v-if="record.estado == 'ANULADO'">ANULADO</a-tag>

                        <!--Tag-->
                        <a-tag color="blue" v-if="record.estado == 'FACTURADO'">FACTURADO</a-tag>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'creado'">
                        {{ new Date(record.creado)?.toISOString()?.split("T")[0] }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'acciones'">

                        <!--Component-->
                        <Print :record="record" />
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
    GetReciboApi
} from "@/services"

import {
    getResponse
} from "@/utils/index"

import {
    getToken
} from "@/utils/request"

import axios from "axios"

import numeral from "numeral"

import Print from "@/components/recibo/ComponentPrint.vue"

import Crear from "@/components/recibo/ComponentCreate.vue"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceRb: [],

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

            const recibo = await axios.post(GetReciboApi, body, config)

            this.dataSourceRb = recibo?.data

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

            title: "SERIE",

            dataIndex: "serie",

            key: "serie",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.serie?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {

            title: "SOCIEDAD",

            dataIndex: "sociedad",

            key: "sociedad",

            align: "center",

            filters: [{

                text: "OUTLANDER",

                value: "OUTLANDER"
            },
            {
                text: "CREDICITY",

                value: "CREDICITY"
            }],

            onFilter: (value, record) => record.sociedad?.toString()?.includes(value)
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
            title: "CANTIDAD",

            dataIndex: "valor",

            key: "valor",

            align: "center"
        },
        {
            title: "TIPO",

            dataIndex: "tipo_pago",

            key: "tipo_pago",

            align: "center",

            filters: [{

                text: "EFECTIVO",

                value: "EFECTIVO"
            },
            {
                text: "TARJETA",

                value: "TARJETA"
            },
            {
                text: "TRANSFERENCIA",

                value: "TRANSFERENCIA"
            },
            {
                text: "CHEQUE",

                value: "CHEQUE"
            }],

            onFilter: (value, record) => record.tipo_pago?.toString()?.includes(value)
        },
        {
            title: "SUCURSAL",

            dataIndex: "sucursal",

            key: "sucursal",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.sucursal?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "ESTADO",

            dataIndex: "estado",

            key: "estado",

            align: "center",

            filters: [{

                text: "FACTURADO",

                value: "FACTURADO"
            },
            {
                text: "ANULADO",

                value: "ANULADO"
            }],

            onFilter: (value, record) => record.estado?.toString()?.includes(value)
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
            title: "ACCIONES",

            dataIndex: "acciones",

            key: "acciones",

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
        Print,
        Crear,
        Footer,
        Navbar
    }
};
</script>