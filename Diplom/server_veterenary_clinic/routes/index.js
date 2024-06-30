import express from 'express';
import owner from './owner.js';
import analize from './analize.js';
import appoitment from './appoitment.js';
import certificate from './certificate.js';
import city from './city.js';
import doctor from './doctor.js';
import med_card from './med_card.js';
import patient from './patient.js';
import reviews from './reviews.js';
import services from './services.js';
import subservices from './subservice.js';


const router = new express.Router()

router.use('/owner', owner)
router.use('/analize', analize)
router.use('/appoitment', appoitment)
router.use('/certificate', certificate)
router.use('/city', city)
router.use('/doctor', doctor)
router.use('/med_card', med_card)
router.use('/patient', patient)
router.use('/reviews', reviews)
router.use('/services', services)
router.use('/subservices', subservices)



export default router