const ROOT = 'http://mimandadito.tk/api/public';
export const routes = {
    login: () => {
        return `${ROOT}/login`
    },
    registerUser: () => {
        return `${ROOT}/register`
    },
    provincias: () => {
        return `${ROOT}/provincia/all`
    },
    perfil: ($idPerfil) => {
        return `${ROOT}/perfil/${$idPerfil}`
    },
    editUser: ($idPerfil) => {
        return `${ROOT}/perfil/${$idPerfil}/actualizar`
    },
    direcciones: ($idPerfil) => {
        return `${ROOT}/perfil/${$idPerfil}/direccion/guardar`
    },
    editDireccion: ($idPerfil, $idDireccion) => {
        return `${ROOT}/perfil/${$idPerfil}/direccion/${$idDireccion}/actualizar`
    },    
    metodos: ($idPerfil) => {
        return `${ROOT}/perfil/${$idPerfil}/metodo/guardar`
    },  
    editMetodo: ($idPerfil, $idMetodo) => {
        return `${ROOT}/perfil/${$idPerfil}/metodo/${$idMetodo}/actualizar`
    },  
    deleteMethod: ($idPerfil, $idMetodo) => {
        return `${ROOT}/perfil/${$idPerfil}/metodo/${$idMetodo}/borrar`
    },  
    deleteDirection: ($idPerfil, $idDirection) => {
        return `${ROOT}/perfil/${$idPerfil}/direccion/${$idDirection}/borrar`
    },     
    categories: () => {
        return `${ROOT}/categoriatienda/all`
    },
    stores: ($idCategoria, $lat, $long) => {
        if ($lat != undefined && $long != undefined) {
            return `${ROOT}/tienda/${$idCategoria}/${$lat}/${$long}`
        }else{
            return `${ROOT}/tienda/${$idCategoria}`
        }        
    },
    products:  ($idStore) => {
        return `${ROOT}/producto/${$idStore}`
    },
    order: ($idPerfil) => {
        return `${ROOT}/order/${$idPerfil}`
    },
    orderActive: ($idPerfil) => {
        return `${ROOT}/order/${$idPerfil}/activa`
    }
}