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
                <a-button class="default mb-3">
                    NUEVO DOCUMENTO
                </a-button>
            </router-link>

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceEx" :columns="columnce" bordered
                :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'columna6'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.columna6 }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'columna18'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.columna18 }}
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

            dataSourceEx: [],

            pagination: {

                pageSize: 20,

                showSizeChanger: false,

                onChange: this.doChangeScrollto
            }
        }
    },

    async created() {

        try {

            const excel = await axios.get(GetMutuoPrendarioApi,
            
            {
  "headers": {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoidmljdG9yLmhlcm5hbmRleiIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJjcmVhZG8iOiIyMDIzLTExLTIzVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MDEzODMwNjMsImV4cCI6MTcwMTM4MzEyM30.uSVjy4XMZ29p-Ra1OxrTirNTgWssiqDyXNY064G0yH0"
  }
}
)

            this.dataSourceEx = excel?.data?.MutuoPrendario

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

            dataIndex: "columna1",

            key: "columna1",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.columna1.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
                }
            }
        },
        {
            title: "DUI",

            dataIndex: "columna6",

            key: "columna6",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.columna6.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
                }
            }
        },
        {
            title: "DEPARTAMENTO",

            dataIndex: "columna4",

            key: "columna4",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.columna4.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
                }
            }
        },
        {
            title: "MUNICIPIO",

            dataIndex: "columna5",

            key: "columna5",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.MUNICIPIO.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
                }
            }
        },
        {
            title: "MOTO",

            dataIndex: "columna14",

            key: "columna14",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.MOTO.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
                }
            }
        },
        {
            title: "NUMERO CHASIS",

            dataIndex: "columna18",

            key: "columna18",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.columna18.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => {

                        focusearch.value.focus()

                    }, 100)
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