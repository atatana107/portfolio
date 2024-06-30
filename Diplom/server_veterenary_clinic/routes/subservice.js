import express from 'express';
import SubserviceController from '../controllers/subservice.js'

const router = new express.Router()

// список подуслуг выбранной услуги и выбранного врача
router.get('/getall/serviceId/:serviceId([0-9]+)/doctorId/:doctorId([0-9]+)',SubserviceController.getAll)
// список подуслуг выбранной услуги
router.get('/getall/serviceId/:serviceId([0-9]+)',SubserviceController.getAll)
// список всех подуслуг
router.get('/getall',SubserviceController.getAll)
router.get('/getone/:id([0-9]+)',SubserviceController.getOne)
router.post('/create',SubserviceController.create )
router.put('/update/:id([0-9]+)',SubserviceController.update)
router.delete('/delete/:id([0-9]+)',SubserviceController.delete)
router.get('/check', SubserviceController.check)

export default router