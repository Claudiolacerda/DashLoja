import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { CreateProductDTO } from '../../src/dtos/dtos';
import { AppError } from '../../shared/errors/AppError';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const productExists = await this.productRepository.exists(data.id);
    
    if (productExists) {
      throw new AppError('Product already exists', 409);
    }

    const product = Product.create(data.id, data.name, data.price);
    
    await this.productRepository.save(product);

    return product;
  }
}