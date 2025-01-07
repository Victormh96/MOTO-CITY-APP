<template>
    <!--Img-->
    <img src="https://mg.mccgo.xyz/portada.png" class="img-fondo">

    <!--Component-->
    <Login />
</template>

<!--=======Script=======-->
<script>
import Login from "@/components/authentication/ComponentLogin.vue"

export default {
    components: {
        Login
    }
};
</script>