export enum BikeCategory {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  Electric = 'Electric'
}
export interface Bike {
    name: string;
    brand: string;
    price: number;
    category: BikeCategory;
    description: string;
    quantity: number;
    inStock: boolean;  
  }
