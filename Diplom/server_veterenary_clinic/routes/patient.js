import express from 'express';
import PetientController from '../controllers/patient.js';
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()
//питомцы определенного владельца
//router.get('/getall/ownerId/:ownerId([0-9]+)',PetientController.getAll)
// router.get('/api/patient/:id([0-9]+)', PetientController.getOne);

// получить все заказы пользователя
router.get('/owner/getall', PetientController.getAll) 



router.get('/getall',PetientController.getAll)
router.get('/getone/:id([0-9]+)',PetientController.getOne )
router.post('/create', PetientController.create)
router.put('/update/:id([0-9]+)', authMiddleware, PetientController.update)
router.delete('/delete/:id([0-9]+)', PetientController.delete)

export default router