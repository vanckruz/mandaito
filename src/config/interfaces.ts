import { take } from "rxjs/operator/take";

export interface Order{
    key?: string;
    idOrder: number;
    status: number;
    lng?: number;
    lat?: number;
    usuario?: any;
    tienda?: any;
    mensajero?: any;
    takeMarket?: boolean;
    takeMensajero?: boolean;
    firstNotificationMarket?: boolean;
    firstNotificationMensajero?: boolean;
}