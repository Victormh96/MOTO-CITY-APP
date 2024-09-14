<template>
    <!--Layout-->
    <a-layout-header class="submenu">

        <!--Container-->
        <div class="container">

            <!--Flex-->
            <a-flex :gap="50" justify="center">

                <!--Avatar-->
                <a-avatar>
                    {{ vname + vlastname }}
                </a-avatar>

                <!--Component-->
                <Logout />
            </a-flex>
        </div>
    </a-layout-header>

    <!--Layout-->
    <a-layout-header class="menu">

        <!--Container-->
        <div class="container">

            <!--Row-->
            <a-row>

                <!--Col-->
                <a-col :xs="10" :sm="10" :md="3" :lg="3" :xl="3" :xxl="3" :xxxl="3">

                    <!--Enlace-->
                    <router-link :to="{ name: 'Go' }">

                        <!--Div-->
                        <div class="motocity"></div>
                    </router-link>
                </a-col>

                <!--Col-->
                <a-col :xs="14" :sm="14" :md="21" :lg="21" :xl="21" :xxl="21" :xxxl="21">

                    <!--Flex-->
                    <a-flex justify="flex-end" align="center" gap="middle">

                        <!--Component-->
                        <Theme />
                    </a-flex>
                </a-col>
            </a-row>
        </div>
    </a-layout-header>
</template>

<!--=======Script=======-->
<script>
import {
    authentication
} from "@/store/modules/authentication"

import Theme from "@/components/partials/ComponentTheme.vue"

import Logout from "@/components/authentication/ComponentLogout.vue"

export default {
    data() {
        return {
            vname: authentication()?.cuenta?.usuario?.charAt(0).toUpperCase(),

            vlastname: authentication()?.cuenta?.usuario?.split(".")[1]?.charAt(0).toUpperCase()
        }
    },

    components: {
        Theme,
        Logout
    }
};
</script>
