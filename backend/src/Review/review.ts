import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { prisma } from '../db.js';

const router = Router();

//* fetch all product reviews

router.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.product.findMany({
      where: {
        id: req.params.id
      },
      select: {
        review: true
      }
    });

    if (!reviews) {
      throw new Error('Cannot fetch user reviews');
    }

    res.json(reviews);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* post a review

router.post(
  '/review',
  body('productId').isString(),
  body('userId').isString(),
  body('rating').isString(),
  body('comment').isInt(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const review = await prisma.review.create({
        data: {
          ...req.body
        }
      });

      if (!review) {
        throw new Error('Review not sent');
      }

      res.json({ message: 'Review sent successfully' });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

//* edit your review

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.update({
      where: {
        id: req.params.id
      },
      data: {
        comment: req.body.comment,
        rating: req.body.comment
      },
      select: {
        comment: true,
        rating: true,
        user_id: true,
        product_id: true
      }
    });
    if (!review) {
      throw new Error('Could not update the review');
    }

    res;
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete a review

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: req.params.id
      }
    });

    if (!review) {
      throw new Error('Product review not deleted');
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
