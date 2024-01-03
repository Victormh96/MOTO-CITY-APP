import store from "../store"
import router from "@/router"
import { message } from "ant-design-vue"

const getClose = (err) => {

    const key = 'updatable'

    message.loading({ content: 'Cerrando sesión...', key })

    setTimeout(() => {

        router.push("/")

        message.warning({ content: err + '.', key, duration: 3 })

    }, 1500)
}

const getOpen = (err) => {

    router.push("/go")

    const key = "open"

    message.success({

        key,

        duration: 3,

        content: err + '.'
    })
}

const getSuccess = (err) => {

    message.success({

        duration: 3,

        content: err + '.'
    })
}

const getWarning = (err) => {

    message.warning({

        duration: 3,

        content: err + '.'
    })
}

const getError = (err) => {

    const key = "error"

    message.error({

        key,

        duration: 3,

        content: err + '.'
    })
}

function getResponse(err) {

    if (err.response.status === 500) {

        getWarning('Error, se ha notificado a TI de OUTLANDER')

    } else {

        store.dispatch("CuentaCerrar")

        getClose('Sesión cerrada')
    }
}

export { getClose, getOpen, getSuccess, getWarning, getError, getResponse } 