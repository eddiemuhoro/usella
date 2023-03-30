import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { prisma } from '../db.js';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { verifyEmail } from '../Mailer/productMail.js';
//* register user

const router = Router();

export const register =
  (body('name').isString(),
  body('email').isEmail(),
  body('phone').isString(),
  body('password').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, password } = req.body;
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          password: bcrypt.hashSync(password, 10)
        },
        select: {
          id: true,
          email: true
        }
      });

      if (!user) {
        throw new Error('Registration failed');
      }

      // //* register the profile of the user
      const profile = await prisma.profile.create({
        data: {
          id: user.id
        }
      });

      if (!profile) {
        throw new Error('User profile not created');
      }
      await verifyEmail(user.email, user.id, req.body.name);

      res.status(200).json({
        message: 'user registered',
        verification: 'Verification email sent'
      });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
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
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = bcrypt.compareSync(password, user!.password);

      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      if (!user.isVerified) {
        throw new Error('User not verfied');
      }

      res.status(200).json({
        id: user!.id,
        name: user!.name,
        email: user!.email,
        phone: user!.phone
      });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

//* fetch all the users
//route to show a simple formfiedl to verify the user
// router.get('/verify/:email/:id', async (req: Request, res: Response) => {
//   try {
//     res.send(
//       `<form action="/submit/${req.params.id}/${req.params.email}" method="GET">` +
//         `<input type="text" name="code" placeholder="Enter verification code" val/>` +
//         `<button type="submit">Verify</button>` +
//         `</form>`
//     );
//   } catch (e: any) {
//     res.status(500).json({ message: e.message });
//   }
// });

// router.get('/submit/:id/:email', (req, res) => {
//   const code = req.body.code;
//   console.log(`Received code: ${code}`);
//   res.redirect(
//     `http://localhost:4200/users/verify/${req.params.email}/${code}`
//   );
// });

router.get(
  '/verify/:email/:code',
  body('code'),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      if (req.params.code !== '1234') {
        const user = await prisma.user.update({
          where: {
            email: req.params.email
          },
          data: {
            isVerified: true
          }
        });
        if (!user) {
          throw new Error('Cannot verify user');
        }
        // res.redirect('https://dshopie.vercel.app/login');

        res.json(user);
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isVerified: true,
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

//* get a single user
router.all('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        product: true,
        profile: true
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json(user);
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

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
