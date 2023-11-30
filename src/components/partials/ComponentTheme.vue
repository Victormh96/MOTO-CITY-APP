<template>
    <!--Switch-->
    <a-switch :checked="theme" @change="doChangeTema">

        <!--On-->
        <template #checkedChildren>

            <!--Icon-->
            <i class="fa-solid fa-sun"></i>
        </template>

        <!--Off-->
        <template #unCheckedChildren>

            <!--Icon-->
            <i class="fa-solid fa-moon"></i>
        </template>
    </a-switch>
</template>

<!--=======Script=======-->
<script>
export default {
    data() {
        return {
            theme: null
        }
    },

    created() {
        localStorage.theme === 'true' && this.doChangeTema(true)
    },

    methods: {
        doChangeTema(checked) {

            const html = document.querySelector('html')

            html.setAttribute('data-theme', checked ? 'Black-Mode' : '')

            this.theme = checked

            localStorage.theme = checked
        }
    }
};
</script>