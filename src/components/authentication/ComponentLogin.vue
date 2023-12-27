<template>
    <!--Modal-->
    <a-modal :footer="null" :maskClosable="false" width="450px" :visible="true" class="login" centered>

        <!--Component-->
        <Theme />

        <!--Img-->
        <img src="@/../public/img/motocity-white.png" class="img-login mb-4 mt-3">

        <!--Form-->
        <a-form layout="vertical" :model="formstate" :rules="rules" @finish="doChangeLogin">

            <!--Item-->
            <a-form-item name="usuario" class="mb-4 pt-2">

                <!--Input-->
                <a-input type="text" v-model:value="formstate.usuario" placeholder="Ej: juan.perez" autocomplete="off" />
            </a-form-item>

            <!--Item-->
            <a-form-item name="password" class="mb-4 pt-2">

                <!--Input-->
                <a-input-password type="password" v-model:value="formstate.password" placeholder="••••••••"
                    autocomplete="off" />
            </a-form-item>

            <!--Item-->
            <a-form-item class="text-end pt-2">

                <!--Button-->
                <a-button key="submit" htmlType="submit" :loading="loading" class="button-login">Entrar</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<!--=======Script=======-->
<script>
import {
    reactive
} from "vue"

import Theme from "@/components/partials/ComponentTheme.vue"

export default {
    data() {
        return {
            loading: false
        }
    },

    setup() {

        const formstate = reactive({

            usuario: null,

            password: null
        })

        const rules = {

            usuario: [{

                required: true,

                message: "Campo requerido",

                trigger: "blur"
            },
            {
                max: 30,

                message: "Maximo 30 caracteres",

                trigger: "blur"
            }],

            password: [{

                required: true,

                message: "Campo requerido",

                trigger: "blur"
            },
            {
                min: 8,

                message: "Minimo 8 caracteres",

                trigger: "blur"
            }]
        }

        return {
            rules,
            formstate
        }
    },

    methods: {

        async doChangeLogin(data) {

            this.loading = true

            const body = {

                usuario: data.usuario,

                password: data.password
            }

            await this.$store.dispatch("Cuenta", body)

            this.loading = false
        }
    },

    components: {
        Theme
    }
};
</script>