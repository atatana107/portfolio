import { cities as cityMapping } from '../models/mapping.js';
import City from '../models/City.js'
import AppError from '../errors/AppError.js';

class Cities {
    async getAll(req, res, next) 
    {
        try 
        {
            const city = await City.getAll()
            res.json(city)
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
                throw new Error('Не указан id города')
            }
            const city = await City.getOne(req.params.id)
            if (!city) 
            {
                throw new Error('Город не найден в БД')
            }
            res.json(city)
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
            const city = await City.create(req.body)
            res.json(city)
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
            const city = await City.update(req.params.id, req.body)
            res.json(city)
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
                throw new Error('Не указан id записи')
            }
            const city = await City.delete(req.params.id)
            res.json(city)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    
    async check(req, res) {
        res.status(200).send('Проверка города')
    }
}

export default new Cities()