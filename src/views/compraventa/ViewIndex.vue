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
                COMPRA VENTA
            </a-tag>

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceCv" :columns="column" bordered :scroll="{ x: 1400 }">

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
                        $ {{ record.precio }}
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
                    <template v-if="column.key === 'creado'">
                        {{ new Date(record.creado).toISOString().split("T")[0] }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'acciones'">

                        <!--Component-->
                        <Show :record="record" />
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
    GetCompraVentaApi
} from "@/services/paths"

import axios from "axios"
import Show from "@/components/compraventa/ComponentShow.vue"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"
import Crear from "@/components/compraventa/ComponentCreate.vue"

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
            title: "MODELO",

            dataIndex: "modelo",

            key: "modelo",

            align: "center"
        },
        {
            title: "COLOR",

            dataIndex: "color",

            key: "color",

            align: "center"
        },
        {
            title: "MOTOR",

            dataIndex: "n_motor",

            key: "n_motor",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.n_motor.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

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

                record.n_chasis.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

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
            title: "AÑADIDO",

            dataIndex: "creado",

            key: "creado",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.creado.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

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

        doChangeScrollto() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            })
        }
    },

    components: {
        Show,
        Crear,
        Footer,
        Navbar
    }
};
</script>