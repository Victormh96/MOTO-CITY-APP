<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3">

            <!--Row-->
            <a-row :gutter="[{ sm: 0, md: 16 }, 0]">

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12" :xxxl="12" class="mb-3 mb-lg-0">

                    <!--Desktop-->
                    <img src="https://mg.mccgo.xyz/BannerPC.png" class="d-none d-md-block img-vertical" />

                    <!--Tablet-->
                    <img src="https://mg.mccgo.xyz/BannerTablet.png" class="d-none d-sm-block d-md-none img-vertical" />

                    <!--Mobile-->
                    <img src="https://mg.mccgo.xyz/BannerMobile.png" class="d-sm-none img-vertical" />
                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12" :xxxl="12" class="contenedor">

                    <!--Row-->
                    <a-row :gutter="[0, 16]">

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Tramite', 'Concesionario', 'Jefe', 'Caja'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Compraventa' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/compra-venta.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Tramite', 'Concesionario', 'Jefe', 'Caja'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Primeramatricula' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/primera-matricula.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Tramite', 'Administrador'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Plantilla' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/plantilla.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Caja'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Recibo' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/recibo.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Contabilidad'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'ReciboDownload' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/recibo.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Jefe'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Pagare' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/pagare.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Administrador'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Usuario' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/usuario.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['Logistica'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Pedidos' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/pedidos.png" class="img-horizontal">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="this.getRole(['RRHH'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Metaventa' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/meta-venta.png" class="img-horizontal">
                            </router-link>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
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
    tools
} from "@/store/modules/tools"

import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false
        }
    },

    async created() {

        await tools().Profesion()

        await tools().Municipio()

        await tools().Departamento()

        this.loading = true
    },

    components: {
        Footer,
        Navbar
    }
};
</script>