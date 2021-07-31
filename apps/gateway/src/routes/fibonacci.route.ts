import express from 'express';

import * as fibCtrl from '../controllers/fibonacci.controller';

const router = express.Router();

router.post('/', fibCtrl.fibonacci);

export default router;
