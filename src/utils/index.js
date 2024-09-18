import {
    message
} from "ant-design-vue"

import {
    authentication
} from "@/store/modules/authentication"

import router from "@/router"

const getClose = (err) => {

    const key = "updatable"

    message.loading({

        content: "Cerrando sesión...",

        key
    })

    authentication().CuentaCerrar()

    setTimeout(() => {

        router.push("/")

        message.warning({

            content: err + ".",

            key,

            duration: 3
        })

    }, 1500)
}

const getOpen = (err) => {

    router.push("/go")

    const key = "open"

    message.success({

        key,

        duration: 3,

        content: err + "."
    })
}

const getSuccess = (err) => {

    message.success({

        duration: 3,

        content: err + "."
    })
}

const getWarning = (err) => {

    message.warning({

        duration: 3,

        content: err + "."
    })
}

const getError = (err) => {

    const key = "error"

    message.error({

        key,

        duration: 3,

        content: err + "."
    })
}

const getLoading = (err, key) => {

    message.loading({

        content: err,

        key
    })
}

const getDownload = (err, key) => {

    message.success({

        content: err + ".",

        key,

        duration: 3
    })
}

function getResponse(err) {

    if ([403, 404].includes(err.response?.status)) {

        getClose("Sesión cerrada")

    } else {

        getWarning("Error, se ha notificado a TI de OUTLANDER")
    }
}

export {

    getClose,

    getOpen,

    getSuccess,

    getWarning,

    getError,

    getLoading,

    getDownload,

    getResponse
} 