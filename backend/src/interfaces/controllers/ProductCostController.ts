import { Request, Response, NextFunction } from 'express';
import { UpdateProductCostUseCase } from '../../application/use-cases/UpdateProductCostUseCase';
import { ProductCostRepository } from '../../domain/repositories/ProductCostRepository';
import { updateCostSchema } from '../validators/costValidator';

export class ProductCostController {
  constructor(private updateProductCostUseCase: UpdateProductCostUseCase) {}

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateCostSchema.parse(req.body);
      
      const productCost = await this.updateProductCostUseCase.execute(validatedData);

      return res.status(200).json({
        status: 'success',
        data: productCost
      });
    } catch (error) {
      next(error);
    }
  };

  static async list(
    req: Request,
    res: Response,
    next: NextFunction,
    productCostRepository: ProductCostRepository
  ) {
    try {
      const costs = await productCostRepository.findAll();

      return res.status(200).json({
        status: 'success',
        data: costs
      });
    } catch (error) {
      next(error);
    }
  }
}