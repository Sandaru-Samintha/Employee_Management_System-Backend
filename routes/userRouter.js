import express from 'express';

import { saveUser ,getAllUsers ,userLogin, registerUser } from '../controllers/userController.js'; // userController eke functions tika import karanawa   

const userRouter = express.Router();

userRouter.post('/saveuser', saveUser);
userRouter.get('/getusers', getAllUsers);
userRouter.post('/login', userLogin);
userRouter.post('/registeruser', registerUser);

export default userRouter;
