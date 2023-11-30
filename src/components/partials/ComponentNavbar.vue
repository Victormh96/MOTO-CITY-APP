<template>
    <!--Layout-->
    <a-layout-header class="submenu">

        <!--Container-->
        <div class="container">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :span="24">

                    <!--Enlace-->
                    <a href="https://www.facebook.com/credicitysv" target="_blank" class="me-4">

                        <!--Icon-->
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <!--Enlace-->
                    <a href="https://twitter.com/motocitysv" target="_blank" class="me-4">

                        <!--Icon-->
                        <i class="fa-brands fa-twitter"></i>
                    </a>

                    <!--Enlace-->
                    <a href="https://www.youtube.com/@MotoCityElSalvador" target="_blank" class="me-4">

                        <!--Icon-->
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </a-col>
            </a-row>
        </div>
    </a-layout-header>

    <!--Layout-->
    <a-layout-header class="menu">

        <!--Container-->
        <div class="container">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :xs="10" :sm="10" :md="7" :lg="7" :xl="7" :xxl="7" :xxxl="7" class="text-start">

                    <!--Enlace-->
                    <router-link :to="{ name: 'Go' }">

                        <!--Div-->
                        <div class="credicity"></div>
                    </router-link>
                </a-col>

                <!--Col-->
                <a-col :xs="14" :sm="14" :md="17" :lg="17" :xl="17" :xxl="17" :xxxl="17"
                    class="d-flex align-items-center justify-content-end">

                    <!--Component-->
                    <Theme />
                </a-col>
            </a-row>
        </div>
    </a-layout-header>
</template>

<!--=======Script=======-->
<script>
import Theme from "@/components/partials/ComponentTheme.vue"

export default {
    components: {
        Theme
    }
};
</script>