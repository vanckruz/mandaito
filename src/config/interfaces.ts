export interface Order{
    key?: string;
    idOrder: number,
    idUser: number,
    status: boolean,
    lat?: number,
    lng?: number,
    idMensajero?: number,
    usuarioNombre?: string,
    tiendaNombre?: string,
}