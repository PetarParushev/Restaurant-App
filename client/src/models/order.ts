import { OrderProduct } from "./orderProduct";
import { Table } from "./interfaces/table";
import { User } from "./interfaces/user";

export interface Order {
    id: number;
    User: User;
    Table?: Table;
    orderProducts: OrderProduct[];
    totalPayment: number;
    isCompleted:boolean;
    createdAt:Date;
}