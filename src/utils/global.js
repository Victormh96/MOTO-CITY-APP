import {
    authentication
} from "@/store/modules/authentication"

export function getRole(roles) {

    return roles.includes(authentication()?.cuenta?.rol) ? true : false
}