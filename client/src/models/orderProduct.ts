import { Order } from "./order";
import { Product } from "./interfaces/product";

export interface OrderProduct {
    price: number;
    quantity:number;
    product: Product;
    order: Order;
}