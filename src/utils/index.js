import { message } from "ant-design-vue"

function getLetter(data) {

    return data.toUpperCase()
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

            slpcode: 1 
        },

        config: {

            headers: {

                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoidmljdG9yLmhlcm5hbmRleiIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJjcmVhZG8iOiIyMDIzLTExLTIzVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MDE0NDIxNDUsImV4cCI6MTcwMTQ0NTc0NX0.L8Gwkr7fgupyZMZhqvDRXom1cWwWEeN5XobRxDDnR3s`
            }
        }
    }

    return data
}

export { getLetter, getWarning, getError, getToken } 