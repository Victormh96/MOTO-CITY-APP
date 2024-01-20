<template>
    <!--Component-->
    <Navbar />

    <!--Layout-->
    <a-layout-content class="not-found d-flex" v-if="(loading)">

        <!--Container-->
        <div class="container d-flex justify-content-center align-items-center">

            <!--Img-->
            <div class="img-total"></div>
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
            loading: false
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