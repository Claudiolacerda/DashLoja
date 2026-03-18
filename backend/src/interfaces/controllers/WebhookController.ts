import { Request, Response, NextFunction } from 'express';
import { ProcessWebhookUseCase } from '../../application/use-cases/ProcessWebhookUseCase';
import { WebhookMapper } from '../../infrastructure/mappers/WebhookMapper';
import { webhookSchema } from '../validators/webhookValidator';
import { OrderRepository } from '../../domain/repositories/OrderRepository';

export class WebhookController {
  constructor(private processWebhookUseCase: ProcessWebhookUseCase) {}

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = webhookSchema.parse(req.body);
      
      const webhookDTO = WebhookMapper.toDomain(validatedData);
      
      const order = await this.processWebhookUseCase.execute(webhookDTO);

      return res.status(201).json({
        status: 'success',
        data: order
      });
    } catch (error) {
      next(error);
    }
  };

  static async list(
    req: Request,
    res: Response,
    next: NextFunction,
    orderRepository: OrderRepository
  ) {
    try {
      const orders = await orderRepository.findAll();

      return res.status(200).json({
        status: 'success',
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }
}