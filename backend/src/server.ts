import express from 'express';
import cors from 'cors';
import { InMemoryProductRepository } from './infrastructure/repositories/InMemoryProductRepository';
import { InMemoryProductCostRepository } from './infrastructure/repositories/InMemoryProductCostRepository';
import { InMemoryOrderRepository } from './infrastructure/repositories/InMemoryOrderRepository';
import { CreateProductUseCase } from './application/use-cases/CreateProductUseCase';
import { UpdateProductCostUseCase } from './application/use-cases/UpdateProductCostUseCase';
import { ProcessWebhookUseCase } from './application/use-cases/ProcessWebhookUseCase';
import { GetDashboardUseCase } from './application/use-cases/GetDashboardUseCase';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const productRepository = new InMemoryProductRepository();
const productCostRepository = new InMemoryProductCostRepository();
const orderRepository = new InMemoryOrderRepository();

const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductCostUseCase = new UpdateProductCostUseCase(productCostRepository, productRepository);
const processWebhookUseCase = new ProcessWebhookUseCase(orderRepository);
const getDashboardUseCase = new GetDashboardUseCase(orderRepository, productCostRepository);

// Products
app.post('/api/products', async (req, res) => {
  try {
    const product = await createProductUseCase.execute(req.body);
    res.status(201).json({ status: 'success', data: product });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await productRepository.findAll();
    res.json({ status: 'success', data: products });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Product Costs
app.post('/api/product-costs', async (req, res) => {
  try {
    const cost = await updateProductCostUseCase.execute(req.body);
    res.json({ status: 'success', data: cost });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.get('/api/product-costs', async (req, res) => {
  try {
    const costs = await productCostRepository.findAll();
    res.json({ status: 'success', data: costs });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Orders/Webhook
app.post('/api/webhook', async (req, res) => {
  try {
    const order = await processWebhookUseCase.execute(req.body);
    res.status(201).json({ status: 'success', data: order });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await orderRepository.findAll();
    res.json({ status: 'success', data: orders });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Dashboard
app.get('/api/dashboard', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dashboard = await getDashboardUseCase.execute({
      startDate: startDate as string,
      endDate: endDate as string
    });
    res.json({ status: 'success', data: dashboard });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});