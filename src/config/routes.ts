const ROOT = 'http://mimandadito.tk/api/public/';
export const routes = {
    categories: function(){
        return `${ROOT}categoriatienda/all`
    },
    stores: function ($idCategoria) {
        return `${ROOT}tienda/${$idCategoria}`
    },
    products: function ($idStore) {
        return `${ROOT}producto/${$idStore}`
    }    
}