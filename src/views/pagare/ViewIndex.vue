<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">

            <!--Component-->
            <Crear />

            <!--Tag-->
            <a-tag color="#196789" class="titulo"><i class="fas fa-bell fa-shake"></i>&nbsp;
                PAGARE
            </a-tag>

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourcePg" :columns="column" bordered :scroll="{ x: 1400 }">

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
                    <template v-if="column.key === 'dui'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.dui }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'fecha_pago'">
                        {{ new Date(record.fecha_pago).toISOString().split("T")[0] }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'creado'">
                        {{ new Date(record.creado).toISOString().split("T")[0] }}
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
    getResponse
} from "@/utils/index"

import {
    getToken
} from "@/utils/request"

import {
    GetPagareApi
} from "@/services/paths"

import axios from "axios"
import Crear from "@/components/pagare/ComponentCreate.vue"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourcePg: [],

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

            const pagare = await axios.post(GetPagareApi, body, config)

            this.dataSourcePg = pagare?.data

            this.loading = true

        } catch (err) {

            console.error(err)

            getResponse(err)
        }
    },

    setup() {

        const focusearch = ref()

        const state = reactive({

            searchText: '',

            searchedColumn: ''
        })

        const column = [{

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
            title: "FECHA PAGO",

            dataIndex: "fecha_pago",

            key: "fecha_pago",

            align: "center"
        },
        {
            title: "CREDITO",

            dataIndex: "credito",

            key: "credito",

            align: "center",

        },
        {
            title: "CREADO",

            dataIndex: "creado",

            key: "creado",

            align: "center",

        }
        ]

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
        Navbar
    }
};
</script>