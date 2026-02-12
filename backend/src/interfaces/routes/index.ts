import { Router } from 'express';
import { InMemoryProductRepository } from '../../infrastructure/repositories/InMemoryProductRepository';
import { InMemoryProductCostRepository } from '../../infrastructure/repositories/InMemoryProductCostRepository';
import { InMemoryOrderRepository } from '../../infrastructure/repositories/InMemoryOrderRepository';
import { CreateProductUseCase } from '../../application/use-cases/CreateProductUseCase';
import { UpdateProductCostUseCase } from '../../application/use-cases/UpdateProductCostUseCase';
import { ProcessWebhookUseCase } from '../../application/use-cases/ProcessWebhookUseCase';
import { GetDashboardUseCase } from '../../application/use-cases/GetDashboardUseCase';
import { ProductController } from '../controllers/ProductController';
import { ProductCostController } from '../controllers/ProductCostController';
import { WebhookController } from '../controllers/WebhookController';
import { DashboardController } from '../controllers/DashboardController';

const router = Router();

const productRepository = new InMemoryProductRepository();
const productCostRepository = new InMemoryProductCostRepository();
const orderRepository = new InMemoryOrderRepository();

const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductCostUseCase = new UpdateProductCostUseCase(
  productCostRepository,
  productRepository
);
const processWebhookUseCase = new ProcessWebhookUseCase(orderRepository);
const getDashboardUseCase = new GetDashboardUseCase(
  orderRepository,
  productCostRepository
);

const productController = new ProductController(createProductUseCase);
const productCostController = new ProductCostController(updateProductCostUseCase);
const webhookController = new WebhookController(processWebhookUseCase);
const dashboardController = new DashboardController(getDashboardUseCase);

router.post('/products', productController.create);
router.get('/products', (req, res, next) => 
  ProductController.list(req, res, next, productRepository)
);

router.post('/product-costs', productCostController.update);
router.get('/product-costs', (req, res, next) => 
  ProductCostController.list(req, res, next, productCostRepository)
);

router.post('/webhook', webhookController.process);
router.get('/orders', (req, res, next) => 
  WebhookController.list(req, res, next, orderRepository)
);

router.get('/dashboard', dashboardController.get);

export default router;