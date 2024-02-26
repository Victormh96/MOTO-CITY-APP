<template>
    <!--Layout-->
    <a-layout-header class="submenu">

        <!--Container-->
        <div class="container">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :span="24" class="text-center">

                    <!--Avatar-->
                    <a-avatar class="me-5">
                        {{ vname + vlastname }}
                    </a-avatar>

                    <!--Component-->
                    <Logout />
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
                        <div class="motocity"></div>
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
import Logout from "@/components/authentication/ComponentLogout.vue"

export default {
    data() {
        return {
            vname: this.$store.state.authentication?.cuenta?.usuario.charAt(0).toUpperCase(),
            vlastname: this.$store.state.authentication?.cuenta?.usuario?.split(".")[1]?.charAt(0).toUpperCase()
        }
    },

    components: {
        Theme,
        Logout
    }
};
</script>
