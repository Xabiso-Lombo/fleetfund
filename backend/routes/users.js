// import express from 'express';
// import User from '../models/User';

// const router = express.Router();

// // Save investment interest (protected route)
// router.post('/interest', async (req, res) => {
//   try {
//     const { userId, amount, roi, period } = req.body;
    
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { 
//         isInvestor: true,
//         investmentInterest: { amount, roi, period }
//       },
//       { new: true }
//     );

//     res.json({ message: 'Interest recorded', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all users (for admin)
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;