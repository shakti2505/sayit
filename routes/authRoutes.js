import express from 'express';
import { googleLogin } from '../controller/authControler.js';
const router = express.Router();

// test     

router.get('/test', (req, res)=>{
    return res.send('Hello world');
})

router.get('/google', googleLogin);

export default router;