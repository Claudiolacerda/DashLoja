export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly createdAt: Date = new Date()
  ) {}

  static create(id: string, name: string, price: number): Product {
    if (!id || id.trim() === '') {
      throw new Error('Product ID is required');
    }
    if (!name || name.trim() === '') {
      throw new Error('Product name is required');
    }
    if (price <= 0) {
      throw new Error('Product price must be greater than zero');
    }
    return new Product(id, name, price);
  }
}