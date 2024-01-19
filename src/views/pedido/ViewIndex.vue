<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out pt-5 mt-2" v-if="(loading)">

        <!--Container-->
        <div class="container">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :span="24">

                    <!--Calendar-->
                    <a-calendar :value="date" @select="onSelect" />

                    <!--Popconfirm-->
                    <a-popconfirm title="¿Generar documento?" ok-text="Si" cancel-text="No" @confirm="doChangeFecha">

                        <!--Button-->
                        <a-button class="button-completar">
                            Descargar
                        </a-button>
                    </a-popconfirm>
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
    ref
} from "vue"

import {
    saveAs
} from "file-saver"

import {
    getSuccess,
    getResponse
} from "@/utils/index"

import {
    DownloadPedidoApi
} from "@/services/paths"

import axios from "axios"
import dayjs from "dayjs"
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false
        }
    },

    created() {

        setTimeout(() => { this.loading = true }, 850)
    },

    setup() {

        const date = ref(dayjs())

        const onSelect = value => {

            date.value = value
        }

        return {
            date,
            onSelect
        }
    },

    methods: {

        async doChangeFecha() {

            try {

                const response = await axios.post(DownloadPedidoApi,

                    { FECHA: this.date.format('YYYY-MM-DD') },

                    { responseType: 'blob' })

                const blob = new Blob(

                    [response.data],

                    { type: 'text/csv' })

                saveAs(blob, `PEDIDOS-${dayjs().format('YYYY-MM-DD HH_mm_ss')}.csv`)

                getSuccess('Descargando')

            } catch (err) {

                console.error(err)

                getResponse(err)
            }
        }
    },

    components: {
        Footer,
        Navbar
    }
};
</script>