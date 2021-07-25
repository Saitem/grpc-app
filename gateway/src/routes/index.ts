import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import fibRoute from './fibonacci.route';
import authRoute from './auth.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/fibonacci', authToken, fibRoute);

export default router;