import express from 'express';
import DoctorController from '../controllers/doctor.js';
import DoctorServiceController from '../controllers/doctor_service.js'

const router = new express.Router()
// список всех докторов
router.get('/getall', DoctorController.getAll)
router.get('/getone/:id([0-9]+)', DoctorController.getOne)
router.get('/appoitment/:id([0-9]+)', DoctorController.getOneDoctorAllAppoitment)
router.post('/create', DoctorController.create)
router.put('/update/:id([0-9]+)', DoctorController.update)
router.delete('/delete/:id([0-9]+)', DoctorController.delete)
router.get('/check', DoctorController.check)

router.get('/:doctorId([0-9]+)/certificates/getall', DoctorController.getAllCertificateByDoctorId)


//список всех врачей с их услугами
router.get('/services/getall', DoctorController.getAllDoctorsWithServices);
// список услуг врача
router.get('/:ID_doctor([0-9]+)/service/getall', DoctorServiceController.getAll)
// одна услуга врача
router.get('/:ID_doctor([0-9]+)/service/getone/:ID_service([0-9]+)', DoctorServiceController.getOne)
// создать услугу врача
router.post(
    '/:IDdoctor([0-9]+)/service/create',
    // authMiddleware,
    // adminMiddleware,
    DoctorServiceController.create
)
// обновить услугу врача
router.put(
    '/:ID_doctor([0-9]+)/service/update/:ID_service([0-9]+)',
    // authMiddleware,
    // adminMiddleware,
    DoctorServiceController.update
)
// удалить услугу врача
router.delete(
    '/:ID_doctor([0-9]+)/service/delete/:ID_service([0-9]+)',
    // authMiddleware,
    // adminMiddleware,
    DoctorServiceController.delete
)

export default router