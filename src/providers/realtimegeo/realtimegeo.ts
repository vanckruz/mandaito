import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';
import { Order } from '../../config/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class RealtimegeoProvider {

  private ordersListRef = this.db.list<Order>('ordersList');

  constructor(
    public http: HttpClient, 
    private db: AngularFireDatabase
  ){
    console.log('Hello RealtimegeoProvider Provider');
  }

  getDetailOrder(key){
    return this.db.object<Order>(`ordersList/${key}`);
  }

  getOrderList(){
    return this.ordersListRef;
  }

  addOrder(order: Order) {
    return this.ordersListRef.push(order);
  }

  editOrder(order: Order) {
    return this.ordersListRef.update(order.key, order);
  }

  removeOrder(order: Order) {
    return this.ordersListRef.remove(order.key);
  }  

}
