import store from "../store"
import router from "@/router"
import { message } from "ant-design-vue"

function getLetter(data) {

    return data.toUpperCase()
}

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

            PLAZO: record?.PLAZO,

            CUOTA: record?.CUOTA,

            CANTIDAD: record?.CANTIDAD,

            INTERES: record?.INTERES,

            POLIZA: record?.POLIZA,

            MARCA: record?.MARCA,

            MODELO: record?.MODELO,

            ANIO: record?.ANIO,
            
            COLOR: record?.COLOR,

            NUMEROMOTOR: record?.NUMEROMOTOR,

            NUMEROCHASIS: record?.NUMEROCHASIS,

            NUMEROVIN: record?.NUMEROVIN,

            TIPO: record?.TIPO,

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

export { getLetter, getClose, getOpen, getWarning, getError, getToken, getCreate } 