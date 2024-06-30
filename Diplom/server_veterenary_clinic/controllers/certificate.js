import { certificate as certificateMapping } from '../models/mapping.js';
import Certificate from '../models/Certificate.js'
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class Certificates {

    async getAll(req, res, next) 
    {
        
        try 
        {
            const certificate = await Certificate.getAll(req.params)
            res.json(certificate)
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
                throw new Error('Не указан id сертификата')
            }
            const certificate = await Certificate.getOne(req.params.id)
            if (!certificate) 
            {
                throw new Error('Сертификат не найден в БД')
            }
            res.json(certificate)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) 
    {
        console.log(req.body)
        console.log(req.files)
        try 
        {
            const сertificate = await Certificate.create(req.body, req.files?.Certificate)
            res.json(сertificate)
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
                throw new Error('Не указан id сертификата')
            }
            const certificate = await Certificate.update(req.params.id, req.body, req.files?.Certificate)
            res.json(certificate)
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
                throw new Error('Не указан id сертификата')
            }
            const certificate = await Certificate.delete(req.params.id)
            res.json(certificate)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


}

export default new Certificates()


 
