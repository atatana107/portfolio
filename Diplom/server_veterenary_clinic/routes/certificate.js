import express from 'express';
import CertificateController from '../controllers/certificate.js';

const router = new express.Router()
//сертификаты выбранного врача
router.get('/getall/doctorId/:doctorId([0-9]+)', CertificateController.getAll)
//все сертификаты
router.get('/getall', CertificateController.getAll)
router.get('/getone/:id([0-9]+)', CertificateController.getOne)
router.post('/create', CertificateController.create)
router.put('/update/:id([0-9]+)', CertificateController.update)
router.delete('/delete/:id([0-9]+)', CertificateController.delete)

export default router