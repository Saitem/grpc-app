import express from 'express';

import * as authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.post('/signUp', authCtrl.signUp);
router.post('/signIn', authCtrl.signIn);

export default router;
