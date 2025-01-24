import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  // Filters out special fields and applies remaining filters
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Apply filtering if specific keys are provided
    if (this.query.filter) {
      queryObj.authorId = this.query.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sorting functionality with sortBy and sortOrder
  sort() {
    const sortBy = (this?.query?.sortBy as string) || 'createdAt';
    const sortOrder = (this?.query?.sortOrder as string) === 'desc' ? '-' : '';
    const sort = `${sortOrder}${sortBy}`; // e.g., '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // Select specific fields
  fields() {
    const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '';
    this.modelQuery = this?.modelQuery?.select(fields);
    return this;
  }
}

export default QueryBuilder;
