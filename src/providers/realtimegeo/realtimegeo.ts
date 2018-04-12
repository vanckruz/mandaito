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

  addOrder(key, order: Order) {
    return this.db.object<Order>(`ordersList/${key}`).set(order);

    // return this.db.database.ref("orderList/FA004").set(order);    

    // return new Promise( (resolve, reject) => {
    //   let ref = this.db.database.ref("orderList/FA004");
    //   ref.set(order);   
    //   resolve("key:"+ref.key)
    // });    
  }

  editOrder(key, order) {
    return this.ordersListRef.update(key, order);
  }

  removeOrder(key) {
    return this.ordersListRef.remove(key);
  }  

}
