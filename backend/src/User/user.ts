import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { prisma } from '../db.js';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
//* register user

const router = Router();





export const register =
  (body('name').isString(),
  body('email').isEmail(),
  body('phone').isString(),
  body('password').isString(),
  body('location').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, password, location } = req.body;
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          password: bcrypt.hashSync(password, 10),
          location: location
        }
      });

      if (!user) {
        res.status(500).json('could not create user');
      }

      // //* register the profile of the user
      const profile = await prisma.profile.create({
        data: {
          id: user.id
        }
      });

      if (!profile) {
        res.status(500).json({ message: 'user profile not created' });
      }

      res.json({ message: 'user created successfully', id: user.id });
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  });

//* login user

export const login =
  (body('email').isString(),
  body('password').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      if (!email) {
        res
          .status(404)
          .json({ message: 'make sure you provide the right credentials' });
      }

      const isValid = await bcrypt.compare(password, user!.password);

      if (!isValid) {
        res.status(500).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'User logged in successfully', id: user!.id });
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  });

//* fetch all the users

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        product: true,
        profile: true
      }
    });

    if (!users) {
      throw new Error('Cannot fetch users');
    }

    res.json(users);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete account

router.all('/delete/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });

    if (!user) {
      throw new Error('Account not deleted');
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// router.all('/verify', async (_req: Request, res: Response) => {
//   try {
//   } catch (e: any) {
//     res.status(500).json({ message: e.message });
//   }
// });

export default router;
