import express from 'express';
import CityController from '../controllers/city.js';

const router = new express.Router()

router.get('/getall',CityController.getAll)
router.get('/getone/:id([0-9]+)',CityController.getOne)
router.post('/create', CityController.create)
router.put('/update/:id([0-9]+)', CityController.update)
router.delete('/delete/:id([0-9]+)', CityController.delete)
router.get('/check', CityController.check)

export default router