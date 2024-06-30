import { appoitment as appoitmentMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';
import Appoitment from '../models/Appoitment.js'
//import FileService from '../services/File.js';

class Appoitments {

    async getAll(req, res, next) 
    {
        try 
        {
            const appoitment = await Appoitment.getAll(req.params)
            res.json(appoitment)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    async getAllAppoitmentforAdmin(req, res, next) 
    {
        try 
        {
            const appoitment = await Appoitment.getAllAppoitmentforAdmin(req.params)
            res.json(appoitment)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    async getDoctorsByCityAndService(req, res, next) {
        try {
            const doctors = await Appoitment.getDoctorsByCityAndService(req, res);
            res.json(doctors);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getAppointmentsByCityServiceAndDoctor(req, res, next) {
        try {
            const appointmentTimes = await Appoitment.getAppointmentsByCityServiceAndDoctor(req, res);
            res.json(appointmentTimes);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getAppointmentsByParameters(req, res, next) {
        const { ID_service, ID_doctor, Date_appoitment, ID_city } = req.query;
    
        try {
            const appointment = await Appoitment.findOneByParameters(ID_service, ID_doctor, Date_appoitment, ID_city);
            if (!appointment) {
                return res.status(404).json({ message: 'Запись не найдена' });
            }
            res.json(appointment);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    

    async getOne(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id записи')
            }
            const appoitment = await Appoitment.getOne(req.params.id)
            if (!appoitment) 
            {
                throw new Error('Запись не найдена в БД')
            }
            res.json(appoitment)
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
            const appoitment = await Appoitment.create(req.body)
            res.json(appoitment)
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
                throw new Error('Не указан id записи')
            }
            const appoitment = await Appoitment.update(req.params.id, req.body)
            res.json(appoitment)
            } catch(e) 
            {
                next(AppError.badRequest(e.message))
            }
    }


    async getServicesByCity(req, res, next) {

        try {
            if (!req.params.id) {
                throw new Error('Не указан ID города');
            }
            const services = await Appoitment.getServicesByCity(req.params.id);
            res.json(services);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getDoctorsByCity(req, res, next) {

        try {
            if (!req.params.id) {
                throw new Error('Не указан ID города');
            }
            const doctors = await Appoitment.getDoctorsByCity(req.params.id);
            res.json(doctors);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async updateForUser(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id записи')
            }
            const appoitment = await Appoitment.updateForUser(req.params.id, req.body)
            res.json(appoitment)
            } catch(e) 
            {
                next(AppError.badRequest(e.message))
            }
    }
    async cancellationByUser(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id записи')
            }
            const appoitment = await Appoitment.updateForUser(req.params.id, req.body)
            res.json(appoitment)
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
                throw new Error('Не указан id записи')
            }
            const appoitment = await Appoitment.delete(req.params.id)
            res.json(appoitment)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Appoitments()
