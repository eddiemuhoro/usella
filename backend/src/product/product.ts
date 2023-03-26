import { body } from 'express-validator';
import { prisma } from '../db.js';
import { Request, Response, Router } from 'express';
import { handleErrors } from '../middleware/handleErrors.js';
import { sendMail } from '../Mailer/productMail.js';
// import { Category } from '@prisma/client';
// import { Category } from '@prisma/client';

const router = Router();

//* fetch all the products

router.get('/', async (_req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany();

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

// router.get(
//   '/category/:category',

//   handleErrors,
//   async (req: Request, res: Response) => {
//     try {
//       const category: Category = req.params.category as Category;
//       const product = await prisma.product.findMany({
//         where: {
//           category: category
//         }
//       });

//       if (!product) {
//         throw new Error('Category products not found');
//       }
//       res.json(product);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }
// );

//* Post a new product

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

router.put('/:id', async (req: any, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.id
      },
      data: {
        ...req.body
      }
    });

    if (!product) {
      throw new Error('Could not update the product');
    }

    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete a specific product by id

router.delete('/:id', async (req: any, res: Response) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: req.params.id
      }
    });

    if (!product) {
      throw new Error('Cannot delete the product');
    }

    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete all the user products by id

router.delete('/all/:id', async (req: Request, res: Response) => {
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

export default router;
