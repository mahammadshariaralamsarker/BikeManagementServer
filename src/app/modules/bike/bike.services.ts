/* eslint-disable @typescript-eslint/no-explicit-any */
// import QueryBuilder from '../../builder/QueryBuilder';
// import { searchByBike } from './Bike.constant';

import { Bike } from './bike.model';
import { TBike } from './bikeInterface';

// Bi Cycle Data Save to Database
const BikeDataSaveToDatabase = async (bike: TBike) => {
  const result = await Bike.create(bike);
  return result;
};

// All Bi-Cycle Data get From Database
const getAllBikeDataFromDatabase = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  const queryObject = { ...query };
  const BikeSearchableField = ['brand', 'name', 'category'];
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // Price Range Validation and Data Set
  if (query?.minPrice) {
    minPrice = Number(query?.minPrice);
  }
  if (query?.maxPrice) {
    maxPrice = Number(query?.maxPrice);
  }
  let searchQuery = Bike.find();
  if (searchTerm) {
    searchQuery = searchQuery.find({
      $or: BikeSearchableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter: Record<string, number> = {};
    if (minPrice !== undefined) {
      priceFilter.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      priceFilter.$lte = maxPrice;
    }
    searchQuery = searchQuery.find({ price: priceFilter });
  }

  // Availability Filtering
  if (query.availability) {
    if (query.availability === 'in-stock') {
      searchQuery = searchQuery.find({ stock: { $gt: 0 } });
    } else if (query.availability === 'out-of-stock') {
      searchQuery = searchQuery.find({ stock: { $lte: 0 } });
    }
  }

  // Exclude Filed For Filter
  const excludeField = ['searchTerm', 'maxPrice', 'minPrice', 'availability'];
  excludeField.forEach((el) => delete queryObject[el]);
  searchQuery = searchQuery.find(queryObject);
  const result = await searchQuery.exec();
  return result;
};
// Get Specific Field Data get From Database
const getSpecificFieldCycleDataFromDatabase = async () => {
  const result = await Bike.find().select('brand model category');
  return result;
};
// Single Bi-Cycle Data get From Database
const getSingleBikeDataFromDatabase = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};

// Single Bi-Cycle Data Update From Database
const singleBikeDataUpdateFromDatabase = async (id: string, cycle: TBike) => {
  const result = await Bike.findByIdAndUpdate(id, { ...cycle }, { new: true });
  return result;
};

// Single Bi-Cycle Data Delete From Database
const singleBikeDataDeleteFromDatabase = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

// Export Bi Cycle Services
export const BikeServices = {
  BikeDataSaveToDatabase,
  getAllBikeDataFromDatabase,
  getSingleBikeDataFromDatabase,
  singleBikeDataUpdateFromDatabase,
  singleBikeDataDeleteFromDatabase,
  getSpecificFieldCycleDataFromDatabase,
};
