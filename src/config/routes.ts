const ROOT = 'http://mimandadito.tk/api/public';
export const routes = {
    login: function() {
        return `${ROOT}/login`
    },
    registerUser: function() {
        return `${ROOT}/register`
    },
    provincias: function() {
        return `${ROOT}/provincia/all`
    },
    perfil: function($id){
        return `${ROOT}/perfil/${$id}`
    },
    categories: function(){
        return `${ROOT}/categoriatienda/all`
    },
    stores: function ($idCategoria) {
        return `${ROOT}/tienda/${$idCategoria}`
    },
    products: function ($idStore) {
        return `${ROOT}/producto/${$idStore}`
    }    
}