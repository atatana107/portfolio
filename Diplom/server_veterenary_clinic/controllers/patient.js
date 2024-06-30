import { patient as patientMapping } from '../models/mapping.js';
import Patient from '../models/Patient.js';
import AppError from '../errors/AppError.js';


class Patients {
    async getAll(req, res, next) 
    {
        try 
        {
            const patient = await Patient.getAll(req.params)
            res.json(patient)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


    async ownerGetAll(req, res, next) {
        try {
            const ownerId = req.params.ownerId;  // Используется req.params, а не req.query
            const patients = await Patient.getAll(ownerId);
            res.json(patients);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    async getOne(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id пациента')
            }
            const patient = await Patient.getOne(req.params.id)
            if (!patient) 
            {
                throw new Error('Пациент не найден в БД')
            }
            res.json(patient)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    
    async create(req, res, next) 
    {
        try 
        {
            const patient = await Patient.create(req.body,req.files?.img)
            res.json(patient)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id пациента')
            }
            const patient  = await Patient.update(req.params.id, req.body)
            res.json(patient)
            } 
            catch(e) 
            {
                next(AppError.badRequest(e.message))
            }
    }

    async delete(req, res, next)
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id пациента')
            }
            const patient = await Patient.delete(req.params.id)
            res.json(patient)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Patients()