import { medical_card as medcardMapping } from '../models/mapping.js';
import MedCard from '../models/medCard.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class Card {

    async getAll(req, res, next) 
    {
        try 
        {
            const card = await MedCard.getAll()
            res.json(card)
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
                throw new Error('Не указан id карты')
            }
            const card = await MedCard.getOne(req.params.id)
            if (!card) 
            {
                throw new Error('Карта не найдена в БД')
            }
            res.json(card)
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
            const card = await MedCard.create(req.body, req.files?.Card)
            res.json(card)
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
                throw new Error('Не указан id карты')
            }
            const card = await MedCard.update(req.params.id, req.body, req.files?.Card)
            res.json(card)
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
                throw new Error('Не указан id доктора')
            }
            const card = await MedCard.delete(req.params.id)
            res.json(card)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async getPdfFile(req, res, next) {
        try {
            const fileName = await MedCard.getAll(req.params.Card); // Получаем имя файла из параметров запроса

            // Чтение файла из папки на сервере
            const file = `server_veterinary_clinic/${fileName}`; // Замените на путь к папке с PDF-файлами
            // Отправляем содержимое файла в ответе на запрос
            res.download(file);
        } catch (error) {
            next(error);
        }
    }
}

export default new Card()