<template>
    <!--Img-->
    <img src="@/../public/img/original.png" class="img-fondo">

    <!--Component-->
    <Login />
</template>

<!--=======Script=======-->
<script>
import Login from "@/components/authentication/login/ComponentLogin.vue"

export default {
    components: {
        Login
    }
};
</script>