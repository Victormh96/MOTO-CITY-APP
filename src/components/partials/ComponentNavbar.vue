<template>
    <!--Layout-->
    <a-layout-header class="menu">

        <!--Container-->
        <div class="container">

            <!--Flex-->
            <a-flex :gap="50" justify="center">

                <!--Component-->
                <Theme />

                <!--Component-->
                <Logout />
            </a-flex>
        </div>
    </a-layout-header>
</template>

<!--=======Script=======-->
<script>
import Theme from "@/components/partials/ComponentTheme.vue"

import Logout from "@/components/authentication/ComponentLogout.vue"

export default {
    components: {
        Theme,
        Logout
    }
};
</script>
