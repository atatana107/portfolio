import express from 'express';
import MedCardController from '../controllers/med_card.js';
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', MedCardController.getAll)
router.get('/getone/:id([0-9]+)', MedCardController.getOne)
router.post('/create', MedCardController.create)
router.put('/update/:id([0-9]+)', MedCardController.update)
router.delete('/delete/:id([0-9]+)', MedCardController.delete)

//router.get('/api/get-pdf/:fileName', medCard.getPdfFile);

export default router