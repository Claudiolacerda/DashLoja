import { Request, Response, NextFunction } from 'express';
import { CreateProductUseCase } from '../../application/use-cases/CreateProductUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { createProductSchema } from '../validators/productValidator';

export class ProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createProductSchema.parse(req.body);
      
      const product = await this.createProductUseCase.execute(validatedData);

      return res.status(201).json({
        status: 'success',
        data: product
      });
    } catch (error) {
      next(error);
    }
  };

  static async list(
    req: Request,
    res: Response,
    next: NextFunction,
    productRepository: ProductRepository
  ) {
    try {
      const products = await productRepository.findAll();

      return res.status(200).json({
        status: 'success',
        data: products
      });
    } catch (error) {
      next(error);
    }
  }
}