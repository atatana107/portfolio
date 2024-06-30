import { reviews as reviewMapping } from '../models/mapping.js';
import Reviews from '../models/Review.js';
import AppError from '../errors/AppError.js';


class Review {

    
    async getAll(req, res, next) 
    {
        try 
        {
            const review = await Reviews.getAll(req.params)
            res.json(review)
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
                throw new Error('Не указан id отзыва')
            }
            const review = await Reviews.getOne(req.params.id)
            if (!review) 
            {
                throw new Error('Отзыв не найден в БД')
            }
            res.json(review)
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
            const review = await Reviews.create(req.body)
            res.json(review)
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
                throw new Error('Не указан id отзыва')
            }
            const review = await Reviews.update(req.params.id, req.body)
            res.json(review)
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
                throw new Error('Не указан id отзыва')
            }
            const review = await Reviews.delete(req.params.id)
            res.json(review)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Review()