import { body } from 'express-validator';
import { prisma } from '../db';
import { Request, Response, Router } from 'express';
import { handleErrors } from '../middleware/handleErrors';
import { sendMail } from '../Mailer/productMail';

const router = Router();

router.get('/', async (_req: any, res: Response) => {
  try {
    const product = await prisma.product.findMany();

    if (!product) {
      res.status(500).json({ message: 'products not found' });
    }
    res.json({ product });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (_req: any, res: Response) => {
  try {
    res.json({ message: 'product route reached' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post(
  '/',
  body('name').isString(),
  body('quantity'),
  body('category').isString(),
  body('price'),
  body('location').isString(),
  body('description').isString(),
  body('seller_id').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const product = await prisma.product.create({
        data: {
          ...req.body
        }
      });
      if (!product) {
        res.status(500).json({ message: 'cannot create product' });
      }
      await sendMail('emilio113kariuki@gmail.com', req.body.name);
      res.json({
        product: product,
        message: 'product created successfully',
        email: 'Email sent succesffully'
      });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.put('/', async (_req: any, res: Response) => {
  try {
    res.json({ message: 'product route reached' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/', async (_req: any, res: Response) => {
  try {
    res.json({ message: 'product route reached' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
