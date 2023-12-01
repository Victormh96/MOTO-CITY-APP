<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mt-3 mt-md-4">

            <!--Enlace-->
            <router-link :to="{ name: 'Form' }">

                <!--Button-->
                <a-button class="default mb-3">NUEVO DOCUMENTO</a-button>
            </router-link>

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceMp" :columns="columnce" bordered
                :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'dui'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.dui }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'chasis'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.chasis }}
                        </a-typography-paragraph>
                    </template>
                </template>

                <!--Template-->
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, column }">

                    <!--Div-->
                    <div style="padding: 7px">

                        <!--Input-->
                        <a-input type="search" placeholder="..." :value="selectedKeys[0]" class="buscador-modal"
                            ref="focusearch" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                    </div>
                </template>
            </a-table>
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
    toRefs,
    reactive
} from "vue"

import {
    getToken,
    getWarning
} from "@/utils/index"

import {
    GetMutuoPrendarioApi
} from "@/services/paths"

import axios from "axios"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceMp: [],

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

            const mutuoprendario = await axios.post(GetMutuoPrendarioApi, body, config)

            this.dataSourceMp = mutuoprendario?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getWarning(err.response?.data?.mensaje)

            this.loading = false
        }
    },

    setup() {

        const focusearch = ref()

        const state = reactive({

            searchText: '',

            searchedColumn: ''
        })

        const columnce = [{

            title: "NOMBRE",

            dataIndex: "nombre",

            key: "nombre",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.nombre.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "DUI",

            dataIndex: "dui",

            key: "dui",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.dui.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "DEPARTAMENTO",

            dataIndex: "departamento",

            key: "departamento",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.departamento.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "MUNICIPIO",

            dataIndex: "municipio",

            key: "municipio",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.municipio.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "MOTO",

            dataIndex: "modelo",

            key: "modelo",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.modelo.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "NUMERO CHASIS",

            dataIndex: "n_chasis",

            key: "n_chasis",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.n_chasis.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        }]

        const handleSearch = (selectedKeys, confirm, dataIndex) => {

            confirm()

            state.searchText = selectedKeys[0]

            state.searchedColumn = dataIndex
        }

        return {
            columnce,
            focusearch,
            handleSearch,
            ...toRefs(state),
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
        Navbar
    }
};
</script>