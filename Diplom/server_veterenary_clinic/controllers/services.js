import { service as serviceMapping } from '../models/mapping.js';
import Service from '../models/Service.js';
import AppError from '../errors/AppError.js';


class Services {
    
    async getAll(req, res, next) 
    {
        try 
        {
            const service = await Service.getAll(req.params)
            res.json(service)
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
                throw new Error('Не указан id услуги')
            }
            const service = await Service.getOne(req.params.id)
            if (!service) 
            {
                throw new Error('Услуга не найдена в БД')
            }
            res.json(service)
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
            const service = await Service.create(req.body,req.files?.img)
            res.json(service)
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
                throw new Error('Не указан id услуги')
            }
            const service = await Service.update(req.params.id, req.body, req.files?.img)
            res.json(service)
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
                throw new Error('Не указан id услуги')
            }
            const service = await Service.delete(req.params.id)
            res.json(service)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async check(req, res) {
        res.status(200).send('Проверка услуги')
    }

    async getAllSubservicesByService(req, res, next) {
        try {
            const serviceId = req.params.serviceId;
            const subservices = await Service.getAllSubservicesByService(serviceId);
            res.json(subservices);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    
}

export default new Services()