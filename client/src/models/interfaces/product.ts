import { BaseState } from "../baseState";
import { Category } from "../category";

export interface Product {
    id:number;
    name: string;
    code: string;
    description:string;
    imagePath:string;
    price: number;
    Category: Category;
    timeToCook: number;
  };

 export interface ProductFormInput {
  id: number;
  name: string;
  code: string;
  timeToCook: number;
  price: number;
  description: string;
  categoryId: number;
  file: FileList;
}

export interface ProductsState extends BaseState {
  rows: Product[];
}
