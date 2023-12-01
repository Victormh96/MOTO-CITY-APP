import store from "../store"
import router from "@/router"
import { message } from "ant-design-vue"

function getLetter(data) {

    return data.toUpperCase()
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

export { getLetter, getOpen, getWarning, getError, getToken } 