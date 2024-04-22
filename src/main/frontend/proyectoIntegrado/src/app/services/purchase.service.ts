import {Injectable} from '@angular/core';
import {Purchase} from "../models/Purchase";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchase!: Purchase;

  setPurchase(purchase: Purchase) {
    this.purchase = purchase;
  }

  getPurchase() {
    return this.purchase;
  }
}
