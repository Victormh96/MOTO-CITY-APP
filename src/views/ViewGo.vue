<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out">

        <!--Container-->
        <div class="container mb-3">

            <!--Row-->
            <a-row :gutter="[{ sm: 0, md: 16 }, 0]">

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12" :xxxl="12" class="mb-3 mb-lg-0">

                    <!--Desktop-->
                    <img src="@/assets/img/carrousel/banner.png" class="d-none d-md-block img-vertical" />

                    <!--Tablet-->
                    <img src="@/assets/img/carrousel/bannerx2.png" class="d-none d-sm-block d-md-none img-vertical" />

                    <!--Mobile-->
                    <img src="@/assets/img/carrousel/bannerx3.png" class="d-sm-none img-vertical" />
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
                        <a-col :span="24" v-if="this.getRole(['Contabilidad', 'Administrador'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'DTE' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/dte.png" class="img-horizontal">
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
                        <a-col :span="24" v-if="this.getRole(['Jefe'])">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Preciario' }">

                                <!--Img-->
                                <img src="@/assets/img/categoria/preciario.png" class="img-horizontal">
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
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </a-layout-content>

    <!--Footer-->
    <Footer />
</template>

<!--=======Script=======-->
<script>
import Footer from "@/components/partials/ComponentFooter.vue"

import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    components: {
        Footer,
        Navbar
    }
};
</script>