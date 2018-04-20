import { take } from "rxjs/operator/take";

export interface Order{
    idOrder: number,
    status: number,
    key?: string;
    lng?: number,
    lat?: number,
    takeMarket?: boolean,
    firstNotificationMarket?: boolean,
    firstNotificationMensajero?: boolean,
    takeMensajero?: boolean,
    mensajero?: any,
    usuario?: any,
    tienda?: any,
}