<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="fade-out" v-if="(loading)">

        <!--Container-->
        <div class="container mb-3">

            <a-row :gutter="[{ sm: 0, md: 16 }, 0]">

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12" :xxxl="12" class="mb-3 mb-lg-0">

                    <!--Carrousel-->
                    <a-carousel autoplay :autoplaySpeed="6000" effect="fade">

                        <!--Div-->
                        <div>

                            <!--Img Desktop-->
                            <img src="@/../public/img/carrousel/banner.png" class="d-none d-md-block img-banner" />

                            <!--Img Tablet-->
                            <img src="@/../public/img/carrousel/bannerx2.png" class="d-none d-sm-block d-md-none img-banner" />

                            <!--Img Mobile-->
                            <img src="@/../public/img/carrousel/bannerx3.png" class="d-sm-none img-banner" />
                        </div>
                    </a-carousel>

                </a-col>

                <!--Col-->
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12" :xxxl="12" class="opciones">

                    <!--Row-->
                    <a-row :gutter="[0, 16]">

                        <!--Col-->
                        <a-col :span="24" v-if="['Tramite', 'Concesionario', 'Jefe', 'Caja'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Compraventa' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/compra-venta.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Tramite', 'Concesionario', 'Jefe', 'Caja'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Primeramatricula' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/primera-matricula.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Tramite', 'Administrador'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Plantilla' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/plantilla.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Caja'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Recibo' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/recibo.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Contabilidad'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'ReciboDownload' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/recibo.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Contabilidad', 'Administrador'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'DTE' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/dte.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Jefe'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Pagare' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/pagare.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Administrador'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Usuario' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/usuario.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Jefe'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Preciario' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/preciario.png" class="img-option">
                            </router-link>
                        </a-col>

                        <!--Col-->
                        <a-col :span="24" v-if="['Logistica'].includes(role)">

                            <!--Enlace-->
                            <router-link :to="{ name: 'Pedidos' }">

                                <!--Img-->
                                <img src="@/../public/img/categoria/pedidos.png" class="img-option">
                            </router-link>
                        </a-col>
                    </a-row>
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
import Footer from "@/components/partials/ComponentFooter.vue"
import Navbar from "@/components/partials/ComponentNavbar.vue"

export default {
    data() {
        return {
            loading: false,
            role: this.$store.state.authentication?.cuenta?.rol
        }
    },

    created() {

        setTimeout(() => { this.loading = true }, 800)
    },

    components: {
        Footer,
        Navbar
    }
};
</script>