import { body } from 'express-validator';
import { prisma } from '../db.js';
import { Request, Response, Router } from 'express';
import { handleErrors } from '../middleware/handleErrors.js';
import { productPostedEmail } from '../Mailer/productMail.js';
// import { Category } from '@prisma/client';
// import { Category } from '@prisma/client';

const router = Router();

//* fetch all the products

router.get('/', async (_req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        status: 'AVAILABLE'
      }
    });

    if (!product) {
      res.status(500).json({ message: 'products not found' });
    }
    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* fetch a specific product by id

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id
      }
    });
    if (!product) {
      throw new Error('Cannot fetch product');
    }

    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* fetch all the user products by id

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        seller_id: req.params.id
      }
    });

    if (!products) {
      throw new Error('Cannot fetch user products');
    }

    res.json(products);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* fetch all products of a specific category

router.get(
  '/category/:category',

  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { category } = req.params as any;
      const product = await prisma.product.findMany({
        where: {
          category: category
        }
      });

      if (!product) {
        throw new Error('Category products not found');
      }
      res.json(product);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

//* Post a new product

router.post(
  '/send',
  body('name').isString(),
  body('quantity'),
  body('category').isString(),
  body('price'),
  body('location').isString(),
  body('description').isString(),
  body('seller_id').isString(),
  body('seller_email').isString(),
  body('seller_phone').isString(),
  body('seller_name').isString(),
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
      await productPostedEmail(req.body.seller_email, req.body.seller_name,req.body.name);
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



//* delete a specific product by id



router.delete('/delete/:id', async (req: any, res: Response) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: req.params.id
      }
    });

    if (!product) {
      throw new Error('Cannot delete the product');
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete all the user products by id

router.delete('/user/delete/:id', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.deleteMany({
      where: {
        seller_id: req.params.id
      }
    });

    if (!products) {
      throw new Error('Cannot delete all the products');
    }

    res.json({ message: 'Cannot delete products' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete all the completed products

export default router;
