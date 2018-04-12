export interface Order{
    idOrder: number,
    status: boolean,
    key?: string;
    lng?: number,
    lat?: number,
    mensajero?: any,
    usuario?: any,
    tienda?: any,
}