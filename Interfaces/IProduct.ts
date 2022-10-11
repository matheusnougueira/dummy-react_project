export interface IProduct {
  id: number | string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  category: string;
}
