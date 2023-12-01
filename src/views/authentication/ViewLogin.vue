<template>
    <!--Video-->
    <video src="/img/christmas/video-christmas.mp4" autoplay="true" muted="true" loop="true" />

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