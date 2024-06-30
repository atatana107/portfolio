import { analyzes as analyzesMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class Analize {
    async getAll() {
        const analize = await analyzesMapping.findAll()
        return analize
    }

    async getOne(id) {
        const analize = await analyzesMapping.findByPk(id)
        if (!analize) {
            throw new Error('Анализ не найден в БД')
        }
        return analize
    }

    async create(data, doc) {
        // поскольку doc не допускает null, задаем пустую строку
        const Analyze = FileService.save(doc) ?? ''
        const {ID_card='',  Create_time} = data
        const analize = await analyzesMapping.create({ID_card, Analyze, Create_time})
        return analize
    }

    async update(id, data, doc) {
        const analize = await analyzesMapping.findByPk(id)
        if (!analize) {
            throw new Error('Анализ не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(doc)
        // если загружено новое изображение — надо удалить старое
        if (file && analize.Analyze) {
            FileService.delete(analize.Analyze)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID = analize.ID,
            Create_time = analize.Create_time,
            ID_card = analize.ID_card,
            Analyze = file ? file : analize.Analyze
        } = data
        await analize.update({ID, ID_card, Analyze, Create_time})
        return analize
    }

    async delete(id) {
        const analize = await analyzesMapping.findByPk(id)
        if (!analize) {
            throw new Error('Анализ не найден в БД')
        }
        await analize.destroy()
        return analize
    }


    async getByMedCardId(cardId) {
        try {
            // Получение медицинских карт по ID пациента
            const analize = await analyzesMapping.findAll({
                where: {
                    ID_card: cardId
                }
            });

            return analize;
        } catch (error) {
            throw new Error(`Error getting analyzes by card ID: ${error.message}`);
        }
    }
}

export default new Analize()