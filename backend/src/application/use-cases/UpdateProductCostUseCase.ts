import { ProductCost } from '../../domain/entities/ProductCost';
import { ProductCostRepository } from '../../domain/repositories/ProductCostRepository';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { UpdateCostDTO } from '../../src/dtos/dtos';
import { AppError } from '../../shared/errors/AppError';

export class UpdateProductCostUseCase {
  constructor(
    private productCostRepository: ProductCostRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(data: UpdateCostDTO): Promise<ProductCost> {
    const productExists = await this.productRepository.exists(data.productId);
    
    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    const existingCost = await this.productCostRepository.findByProductId(data.productId);

    let productCost: ProductCost;
    
    if (existingCost) {
      productCost = existingCost.update(data.cost);
    } else {
      productCost = ProductCost.create(data.productId, data.cost);
    }

    await this.productCostRepository.save(productCost);

    return productCost;
  }
}