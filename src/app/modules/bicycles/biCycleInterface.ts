// Bi Cycle Schema Model Data Type
export type TBike = {
  name: string;
  brand: string;
  price: number;
  model: string;
  stock: number;
  image: string;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  productDetails: string;
};
