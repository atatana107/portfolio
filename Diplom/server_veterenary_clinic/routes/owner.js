import express from 'express';
import ownerController from '../controllers/owner.js';
import authMiddleware from '../middleware/authMiddleware.js'
import patientController from '../controllers/patient.js';
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.post('/signup', ownerController.signup)
router.post('/login', ownerController.login)
router.get('/check', authMiddleware, ownerController.check)
router.post('/registration', ownerController.registration)

router.get('/getall', ownerController.getAll)
router.get('/getone/:id([0-9]+)', ownerController.getOne)
router.post('/create',ownerController.create)
router.put('/update/:id([0-9]+)',ownerController.update)
router.delete('/delete/:id([0-9]+)', ownerController.delete)

//питомцы определенного владельца
router.get('/:ownerId([0-9]+)/pets/getall', ownerController.getAllPetsWithMedCardsByOwnerId);


export default router