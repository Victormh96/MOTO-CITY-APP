<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">

            <!--Component-->
            <Crear :dataSourceSc="dataSourceSc"/>

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceUs" :columns="column" bordered :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'enlinea'">

                        <!--Badge-->
                        <a-badge status="processing" color="#2f8919" v-if="record.enlinea" />

                        <!--Badge-->
                        <a-badge status="processing" color="#891924" v-else />
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'nombre'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.nombre }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'tipo'">

                        <!--Typography-->
                        <a-typography-paragraph v-if="record.tipo === 'CV'">
                            COMPRA VENTA
                        </a-typography-paragraph>

                        <!--Typography-->
                        <a-typography-paragraph v-if="record.tipo === 'PG'">
                            PAGARE
                        </a-typography-paragraph>

                        <!--Typography-->
                        <a-typography-paragraph v-if="record.tipo === 'PM'">
                            PRIMERA MATRICULA
                        </a-typography-paragraph>

                        <!--Typography-->
                        <a-typography-paragraph v-if="record.tipo === 'RB'">
                            RECIBO
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'estado'">

                        <!--Tag-->
                        <a-tag color="cyan" v-if="record.estado">ACTIVADO</a-tag>

                        <!--Tag-->
                        <a-tag color="blue" v-else>DESACTIVADO</a-tag>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'creado'">
                        {{ new Date(record.creado).toISOString().split("T")[0] }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'acciones'">

                        <!--Component-->
                        <Editar :record="record" :dataSourceSc="dataSourceSc" />
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
    GetUsuarioApi,
    GetSucursalApi
} from "@/services/paths"

import axios from "axios"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"
import Editar from "@/components/authentication/usuario/ComponentEdit.vue"
import Crear from "@/components/authentication/usuario/ComponentCreate.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceUs: [],
            dataSourceSc: [],

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

            const usuario = await axios.get(GetUsuarioApi, config)

            this.dataSourceUs = usuario?.data

            const sucursal = await axios.get(GetSucursalApi, config)

            this.dataSourceSc = sucursal?.data

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

            title: "EN LINEA",

            dataIndex: "enlinea",

            key: "enlinea",

            align: "center"
        },
        {

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

            title: "USUARIO",

            dataIndex: "usuario",

            key: "usuario",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.usuario.toString().toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownVisibleChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "ROL",

            dataIndex: "rol",

            key: "rol",

            align: "center"
        },
        {
            title: "ESTADO",

            dataIndex: "estado",

            key: "estado",

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
        Crear,
        Footer,
        Navbar,
        Editar
    }
};
</script>