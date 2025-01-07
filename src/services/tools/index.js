const URL_NODE = import.meta.env.VITE_APP_URL_NODE

export const GetSucursalApi = URL_NODE + "/api/tools/sucursal"

export const GetProfesionApi = () => `${URL_NODE}/api/tools/profesion`

export const GetMunicipioApi = () => `${URL_NODE}/api/tools/municipio`

export const GetDepartamentoApi = () => `${URL_NODE}/api/tools/departamento`