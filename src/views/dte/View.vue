<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container-fluid mb-3">

            <!--Table-->
            <a-table :pagination="pagination" :data-source="dataSourceDt" :columns="column" bordered
                :rowKey="row => row.DocEntry" :scroll="{ x: 1400 }">

                <!--Template-->
                <template #bodyCell="{ column, record }">

                    <!--Template-->
                    <template v-if="column.key === 'DocEntry'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.DocEntry }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'DocNum'">

                        <!--Typography-->
                        <a-typography-paragraph :copyable="{ tooltip: false }">
                            {{ record.DocNum }}
                        </a-typography-paragraph>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'ObservacionMH'">
                        {{ record.ObservacionMH ? record.ObservacionMH : "Sin observaciones" }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'Estado'">

                        <!--Tag-->
                        <a-tag color="error" v-if="record.Estado === 'NO PROCESADO'">NO PROCESADO</a-tag>

                        <!--Tag-->
                        <a-tag color="blue" v-if="record.Estado === 'PROCESADO'">PROCESADO</a-tag>

                        <!--Tag-->
                        <a-tag color="warning" v-if="record.Estado === 'RECHAZADO'">RECHAZADO</a-tag>
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'FechadeEmision'">
                        {{ new Date(record.FechadeEmision)?.toISOString()?.split("T")[0] }}
                    </template>

                    <!--Template-->
                    <template v-if="column.key === 'acciones'">

                        <!--Popconfirm-->
                        <a-popconfirm title="¿Estas seguro?" ok-text="Yes" cancel-text="No"
                            @confirm="doChangeStatus(record.DocEntry, record.TipoDoc)"
                            :disabled="record.Estado == 'PROCESADO'">

                            <!--Button-->
                            <a-button :disabled="record.Estado == 'PROCESADO'">
                                ACTUALIZAR
                            </a-button>
                        </a-popconfirm>
                    </template>
                </template>

                <!--Template-->
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, column }">

                    <!--Input-->
                    <a-input type="search" placeholder="..." :value="selectedKeys[0]" ref="focusearch"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                </template>

                <!--Template-->
                <template #expandedRowRender="{ record }">

                    <!--Row-->
                    <a-row :gutter="[24, 24]">

                        <!--Col-->
                        <a-col :span="6">

                            <!--Title-->
                            <a-steps direction="vertical" size="small" :current="4">

                                <!--Step-->
                                <a-step title="CODIGO GENERACION" :description="record?.CodigoGeneracion"
                                    :status="record?.CodigoGeneracion ? '' : 'error'" />

                                <!--Step-->
                                <a-step title="CODIGO DTE" :description="record?.NumAtCard"
                                    :status="record?.NumAtCard ? '' : 'error'" />

                                <!--Step-->
                                <a-step title="SELLO" :description="record?.SelloRecibido"
                                    :status="record?.SelloRecibido ? '' : 'error'" />

                                <!--Step-->
                                <a-step title="RESPUESTA" :description="record?.RespuestaSAP"
                                    :status="record?.RespuestaSAP === 'RECIBIDO' ? '' : 'error'" />
                            </a-steps>
                        </a-col>

                        <!--Col-->
                        <a-col :span="6">

                            <!--Space-->
                            <a-space direction="vertical">

                                <!--Input-->
                                <a-input :value="'CARDCODE ▶️ ' + record.CardCode" readonly />

                                <!--Input-->
                                <a-input :value="'TIPO PERSONA ▶️ ' + record.U_TipoPersona" readonly />

                                <!--Input-->
                                <a-input :value="'TIPO DOCUMENTO ▶️ ' + record.U_TipoDocumento" readonly />

                                <!--Input-->
                                <a-input :value="'EMAIL ▶️ ' + record.U_SN_Email" readonly />
                            </a-space>
                        </a-col>

                        <!--Col-->
                        <a-col :span="6">

                            <!--Space-->
                            <a-space direction="vertical">

                                <!--Input-->
                                <a-input :value="'DUI ▶️ ' + record.U_DUI" readonly />

                                <!--Input-->
                                <a-input :value="'ACTIVIDAD ECONOMICA ▶️ ' + record.U_CodeactiEconomica" readonly />

                                <!--Input-->
                                <a-input :value="'IMPUESTO ▶️ ' + record.TaxCode" readonly />

                                <!--Input-->
                                <a-input :value="'DEPARTAMENTO ▶️ ' + record.U_Departamento" readonly />
                            </a-space>
                        </a-col>

                        <!--Col-->
                        <a-col :span="6">

                            <!--Space-->
                            <a-space direction="vertical">

                                <!--Input-->
                                <a-input :value="'MUNICIPIO ▶️ ' + record.U_Municipio" readonly />

                                <!--Input-->
                                <a-input :value="'NIT ▶️ ' + record.U_NIT" readonly />
                            </a-space>
                        </a-col>
                    </a-row>
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
    GetDTEApi,
    PutDTEApi
} from "@/services"

import {
    getWarning,
    getResponse
} from "@/utils/index"

import {
    PutDTE,
    getToken
} from "@/utils/request"

import axios from "axios"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,

            dataSourceDt: [],

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

            const dte = await axios.get(GetDTEApi, config)

            this.dataSourceDt = dte?.data

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

            title: "DOCENTRY",

            dataIndex: "DocEntry",

            key: "DocEntry",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.DocEntry?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "DOCNUM",

            dataIndex: "DocNum",

            key: "DocNum",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.DocNum?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "SUCURSAL",

            dataIndex: "Sucursal",

            key: "Sucursal",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.Sucursal?.toString()?.toLowerCase().includes(value.toLowerCase()),

            onFilterDropdownOpenChange: visible => {

                if (visible) {

                    setTimeout(() => { focusearch.value.focus() }, 100)
                }
            }
        },
        {
            title: "TIPO",

            dataIndex: "TipoDoc",

            key: "TipoDoc",

            align: "center",

            filters: [{

                text: "FA",

                value: "FA"
            },
            {
                text: "NR",

                value: "NR"
            },
            {
                text: "SJ",

                value: "SJ"
            },
            {
                text: "CF",

                value: "CF"
            },
            {
                text: "NCI",

                value: "NCI"
            }],

            onFilter: (value, record) => record.TipoDoc?.toString()?.includes(value)
        },
        {
            title: "OBSERVACIONES",

            dataIndex: "ObservacionMH",

            key: "ObservacionMH",

            align: "center",

            width: 400
        },
        {
            title: "ESTADO",

            dataIndex: "Estado",

            key: "Estado",

            align: "center",

            filters: [{

                text: "PROCESADO",

                value: "PROCESADO"
            },
            {
                text: "NO PROCESADO",

                value: "NO PROCESADO"
            },
            {
                text: "RECHAZADO",

                value: "RECHAZADO"
            }],

            onFilter: (value, record) => record.Estado?.toString() === value
        },
        {
            title: "CREADO",

            dataIndex: "FechadeEmision",

            key: "FechadeEmision",

            align: "center",

            customFilterDropdown: true,

            onFilter: (value, record) =>

                record.FechadeEmision?.toString()?.toLowerCase().includes(value.toLowerCase()),

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

            align: "center",

            width: 200
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

        async doChangeStatus(docentry, tipodoc) {

            try {

                const { body, config } = PutDTE(docentry, tipodoc)

                await axios.post(PutDTEApi, body, config)

                getWarning("Actualizado")

                setTimeout(function () { location.reload() }, 300)

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        },

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