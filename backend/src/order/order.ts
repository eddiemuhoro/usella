
// import { prisma } from '../db.js';
// import { Request, Response, Router } from 'express';

// const router = Router();

// //* create an order for a product 
// router.post('/order/:id', async (req: Request, res: Response) => {
//     try {
      
//         const { buyer_id, seller_id, product_id, quantity, total_price } = req.body;
//         const order = await prisma.order.create({
          
//             data: {
//                 buyer_id,
//                 seller_id,
//                 product_id,
//                 quantity,
//                 total_price
//                 }
//                 });
//                 if (!order) {
//                     throw new Error('Order not created');
//                     //send email to seller and buyer

//                 }
//                 res.json({ message: 'Order created successfully' });
//             } catch (e: any) {
//                 res.status(500).json({ message: e.message });
//             }
//         }
//     );

// //* fetch order details for a specific user
// router.get('/user/:id', async (req: Request, res: Response) => {
//     try {
//         const orders = await prisma.order.findMany({
//             where: {
//                 buyer_id: req.params.id
//             }
//         });

//         if (!orders) {
//             throw new Error('Cannot fetch user orders');
//         }

//         res.json(orders);
//     } catch (e: any) {
//         res.status(500).json({ message: e.message });
//     }
// }
// );

