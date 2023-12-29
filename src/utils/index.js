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

function getToken() {

    const data = {

        body: {

            slpcode: store.state.authentication?.cuenta?.slpcode
        },

        config: {

            headers: {

                Authorization: store.state.authentication?.cuenta?.token
            }
        }
    }

    return data
}

function getCreate(record) {

    const data = {

        body: {

            NOMBRE: record?.NOMBRE,

            EDAD: record?.EDAD,

            PROFESION: record?.PROFESION,

            DEPARTAMENTO: record?.DEPARTAMENTO,

            MUNICIPIO: record?.MUNICIPIO,

            DUI: record?.DUI,

            PRECIO: record?.PRECIO,

            POLIZA: record?.PLANTILLA === 10 ? "M-" + record?.POLIZA : "4-" + record?.POLIZA,

            MARCA: record?.MARCA,

            MODELO: record?.MODELO,

            ANIO: record?.ANIO,

            COLOR: record?.COLOR,

            NUMEROMOTOR: record?.NUMEROMOTOR,

            NUMEROCHASIS: record?.NUMEROCHASIS,

            NUMEROVIN: record?.NUMEROVIN,

            TIPO: record?.TIPO,

            MESES: record?.MESES,

            VENCIMIENTO: record?.VENCIMIENTO,

            PRIMERACUOTA: record?.PRIMERACUOTA,

            DIAPAGO: record?.DIAPAGO,

            CUOTA: record?.CUOTA,

            PRECIOCUOTA: record?.PRECIOCUOTA,

            PLANTILLA: record?.PLANTILLA,

            USUARIO: store.state.authentication?.cuenta?.slpcode
        },

        config: {

            responseType: 'blob',

            headers: {

                Authorization: store.state.authentication?.cuenta?.token
            }
        }
    }

    return data
}

function getPlantilla(record) {

    const data = {

        body: {

            rol: store.state.authentication?.cuenta?.rol,

            tipo: record
        },

        config: {

            headers: {

                Authorization: store.state.authentication?.cuenta?.token
            }
        }
    }

    return data
}

export { getClose, getOpen, getSuccess, getWarning, getError, getToken, getCreate, getPlantilla } 