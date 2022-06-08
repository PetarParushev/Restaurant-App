import { Product } from "./interfaces/product";

export interface Category {
    id: number;
    name: string;
    description?: string,
    mainCategoryId: number,
    subCategories: Category[];
    Products: Product[]
  }