import express from 'express';
import ServiceController from '../controllers/services.js';

const router = new express.Router()


// список услуг выбранного врача 
router.get('/getall/doctorId/:doctorId([0-9]+)',ServiceController.getAll)
// список услуг выбранного направления
router.get('/:serviceId([0-9]+)/subservice/getall',ServiceController.getAllSubservicesByService)

router.get('/getall',ServiceController.getAll)
router.get('/getone/:id([0-9]+)',ServiceController.getOne )
router.post('/create',ServiceController.create)
router.put('/update/:id([0-9]+)', ServiceController.update)
router.delete('/delete/:id([0-9]+)',ServiceController.delete )
router.get('/check', ServiceController.check)



export default router