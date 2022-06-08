import { BaseState } from "../baseState";
import { Order } from "../order";

export interface Table {
    id:number,
    name: string;
    location: string;
    capacity: number;
    Order?: Order;
  };
  export interface TableFormInput {
    id:number,
    name: string;
    capacity: number;
  }
  
  export interface TableState extends BaseState {
    rows: Table[];
  }