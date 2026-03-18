import { Request, Response, NextFunction } from 'express';
import { GetDashboardUseCase } from '../../application/use-cases/GetDashboardUseCase';

export class DashboardController {
  constructor(private getDashboardUseCase: GetDashboardUseCase) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;

      const filter = {
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined
      };

      const dashboard = await this.getDashboardUseCase.execute(filter);

      return res.status(200).json({
        status: 'success',
        data: dashboard
      });
    } catch (error) {
      next(error);
    }
  };
}