import express from 'express';
import AnalizeController from '../controllers/analize.js';
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', AnalizeController.getAll)
router.get('/getone/:id([0-9]+)', AnalizeController.getOne)
//чтобы создать, изменить или удалить анализы нужно иметь права администратора
router.post('/create',AnalizeController.create)
router.put('/update/:id([0-9]+)',authMiddleware, adminMiddleware, AnalizeController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware,AnalizeController.delete)

export default router