import express from 'express';
import AppoitmentController from '../controllers/appoitment.js';
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()
//записи выбранного врача 
router.get('/getall/doctorId/:doctorId([0-9]+)', AppoitmentController.getAll)

//записи выбранного владельца
router.get('/getall/ownerId/:ownerId([0-9]+)', AppoitmentController.getAll)

//все записи
router.get('/getall', AppoitmentController.getAll)

//все направления записей в выбранном городе
router.get('/services/getall/:id([0-9]+)', AppoitmentController.getServicesByCity)

router.get('/admin/getall', AppoitmentController.getAllAppoitmentforAdmin)

//все врачи записей в выбранном городе
router.get('/doctors/getall/:id([0-9]+)', AppoitmentController.getDoctorsByCity)


router.get('/getone/:id([0-9]+)', AppoitmentController.getOne)
//чтобы создать, изменить или удалить  запись нужно зарегестрироваться и авторизоваться
router.post('/create',authMiddleware, AppoitmentController.create)
router.put('/update/:id([0-9]+)', authMiddleware, AppoitmentController.update)
router.put('/owner/update/:id([0-9]+)', authMiddleware, AppoitmentController.updateForUser)
router.put('/cancellation/owner/update/:id([0-9]+)', authMiddleware, AppoitmentController.cancellationByUser)
router.delete('/delete/:id([0-9]+)',authMiddleware,AppoitmentController.delete )

// Новый маршрут для получения врачей по городу и направлению
router.get('/getdoctors', AppoitmentController.getDoctorsByCityAndService);


// Новый маршрут для получения врачей по городу и направлению и врачу
router.get('/getappoitment', AppoitmentController.getAppointmentsByCityServiceAndDoctor);

// Добавление маршрута для поиска записи по параметрам
router.get('/appointmentsByParam', AppoitmentController.getAppointmentsByParameters);
export default router