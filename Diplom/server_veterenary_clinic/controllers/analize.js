import { analyzes as analyzesMapping } from '../models/mapping.js';
import Analize from '../models/Analize.js'
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';
import fs from 'fs';
// const path = require('path');


class Analyze {

    //получение всех анализов
    async getAll(req, res, next) 
    {
        try 
        {
            const analizes = await Analize.getAll()
            res.json(analizes)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    //получение одного анализа
    async getOne(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id анализа')
            }
            const analize = await Analize.getOne(req.params.id)
            if (!analize) 
            {
                throw new Error('Анализ не найден в БД')
            }
            res.json(analize)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    //создание анализа
    async create(req, res, next) 
    {
        console.log(req.body)
        console.log(req.files)
        try 
        {
            const analize = await Analize.create(req.body, req.files?.Analyze)
            res.json(analize)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    //обновление анализа
    async update(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id анализа')
            }
            const analize = await Analize.update(req.params.id, req.body, req.files?.Analyze)
            res.json(analize)
        }
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    

    //удаление  анализа
    async delete(req, res, next)
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id анализа')
            }
            const analize = await Analize.delete(req.params.id)
            res.json(analize)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Analyze()



