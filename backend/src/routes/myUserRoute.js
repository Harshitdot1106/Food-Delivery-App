import express from 'express';
import {getCurrentUser,createCurrentUser,updatecurrentuser} from '../Controller/MyUserController.js'
import { jwtCheck, jwtParse } from '../middleware/auth.js';
import { validateMyUserRequest } from '../middleware/validation.js';

const router = express.Router();
router.get('/',jwtCheck,jwtParse,getCurrentUser );
router.post('/',jwtCheck,createCurrentUser );
router.put('/',validateMyUserRequest,jwtCheck,jwtParse,updatecurrentuser);

export default router;
