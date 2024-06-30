import { subservice as subserviceMapping } from '../models/mapping.js';
import Subservice from '../models/Subservice.js';
import AppError from '../errors/AppError.js';


class Subservices {
    async getAll(req, res, next) 
    {
        try 
        {
            const subservice = await Subservice.getAll(req.params)
            res.json(subservice)
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
                throw new Error('Не указан id подуслуги')
            }
            const subservice = await Subservice.getOne(req.params.id)
            if (!subservice) 
            {
                throw new Error('Подуслуга не найдена в БД')
            }
            res.json(subservice)
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
            const subservice = await Subservice.create(req.body)
            res.json(subservice)
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
                throw new Error('Не указан id подуслуги')
            }
            const subservice = await Subservice.update(req.params.id, req.body)
            res.json(subservice)
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
                throw new Error('Не указан id подуслуги')
            }
            const subservice = await Subservice.delete(req.params.id)
            res.json(subservice)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    async check(req, res) {
        res.status(200).send('Проверка подуслуги')
    }
}

export default new Subservices()