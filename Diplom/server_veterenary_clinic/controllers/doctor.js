import { doctors as doctorsMapping } from '../models/mapping.js';
import Doctor from '../models/Doctor.js';
import AppError from '../errors/AppError.js';

class Doctors {
    async getAll(req, res, next) 
    {
        try 
        {
            const doctors = await Doctor.getAll()
            res.json(doctors)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id доктора')
            }
            const doctors = await Doctor.getOne(req.params.id)
            if (!doctors) 
            {
                throw new Error('Доктор не найден в БД')
            }
            res.json(doctors)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


    async getOneDoctorAllAppoitment(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id доктора')
            }
            const doctors = await Doctor.getOneDoctorAllAppoitment(req.params.id)
            if (!doctors) 
            {
                throw new Error('Доктор не найден в БД')
            }
            res.json(doctors)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


    async getAllDoctorsWithServices(req, res, next) {
        try {
            const doctors = await Doctor.getAllDoctorsWithServices();
            res.json(doctors);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async create(req, res, next) 
    {
        try 
        {
            const doctor = await Doctor.create(req.body, req.files?.img)
            res.json(doctor)
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
                throw new Error('Не указан id доктора')
            }
            const doctor  = await Doctor.update(req.params.id, req.body, req.files?.img)
            res.json(doctor)
            } catch(e) 
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
                throw new Error('Не указан id доктора')
            }
            const doctors = await Doctor.delete(req.params.id)
            res.json(doctors)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    async check(req, res) {
        res.status(200).send('Проверка доктора')
    }

    async getAllCertificateByDoctorId(req, res, next) {
        try {
            const doctorId = req.params.doctorId;
            const certificate = await Doctor.getAllCertificateByDoctorId(doctorId);
            if (!certificate || certificate.length === 0) {
                return res.status(404).send('certificate not found');
            }
            res.json(certificate);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
}

export default new Doctors()