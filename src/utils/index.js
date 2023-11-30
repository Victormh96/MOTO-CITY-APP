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

function getToken(record) {

    const data = {

        body: {

            message: {

                key: {

                    record: record,

                    responseType: 'blob'
                }
            }
        },

        config: {
            headers: {
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoidmljdG9yLmhlcm5hbmRleiIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJjcmVhZG8iOiIyMDIzLTExLTIzVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MDEwOTY1MDYsImV4cCI6MTcwMTA5NjU2Nn0.0VLjT5z7d6MG7MXnJDqVaGyN-EAckfPlKnAe8W_ex80`
            }
        }
    }

    return data
}

export { getLetter, getWarning, getError, getToken } 