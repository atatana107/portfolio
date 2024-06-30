import express from 'express';
import ReviewController from '../controllers/reviews.js';

const router = new express.Router()
//отзывы выбранного врача
router.get('/getall/doctorId/:doctorId([0-9]+)', ReviewController.getAll)
//все отзывы
router.get('/getall', ReviewController.getAll)
router.get('/getone/:id([0-9]+)',ReviewController.getOne )
router.post('/create',ReviewController.create )
router.put('/update/:id([0-9]+)', ReviewController.update)
router.delete('/delete/:id([0-9]+)',ReviewController.delete )

export default router