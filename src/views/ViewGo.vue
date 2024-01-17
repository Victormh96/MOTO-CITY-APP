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

                    <!--Enlace-->
                    <router-link :to="{ name: 'Compraventa' }" v-if="['Tramite', 'Concesionario', 'Jefe', 'Caja'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/compra-venta.png" class="img-option mb-3">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Primeramatricula' }" v-if="['Tramite', 'Concesionario', 'Jefe', 'Caja'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/primera-matricula.png" class="img-option mb-3">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Plantilla' }" v-if="['Tramite', 'Administrador'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/plantilla.png" class="img-option mb-3 mb-lg-0">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Recibo' }" v-if="['Caja'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/recibo.png" class="img-option mb-3 mb-lg-0">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'ReciboTrigger' }" v-if="['Contabilidad'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/recibo.png" class="img-option mb-3 mb-lg-0">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Pagare' }" v-if="['Jefe'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/pagare.png" class="img-option mb-3 mb-lg-0">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Usuario' }" v-if="['Administrador'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/usuario.png" class="img-option mb-3 mb-lg-0 mt-3">
                    </router-link>

                    <!--Enlace-->
                    <router-link :to="{ name: 'Preciario' }" v-if="['Jefe'].includes(role)">

                        <!--Img-->
                        <img src="@/../public/img/categoria/preciario.png" class="img-option mb-3 mb-lg-0 mt-3">
                    </router-link>
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

        setTimeout(() => { this.loading = true }, 850)
    },

    components: {
        Footer,
        Navbar
    }
};
</script>