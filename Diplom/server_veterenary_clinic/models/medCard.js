import { medical_card as medcardMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class MedCard {
    async getAll() {
        const card = await medcardMapping.findAll()
        return card
    }

    async getOne(id) {
        const card = await medcardMapping.findByPk(id)
        if (!card) {
            throw new Error('Мед. карта  не найдена в БД')
        }
        return card
    }

    async create(data, doc) {
        // поскольку doc не допускает null, задаем пустую строку
        const Card = FileService.save(doc) ?? ''
        const { ID_patient, Date_create} = data
        const card = await medcardMapping.create({Card, ID_patient,Date_create})
        return card
    }

    async getByPatientId(patientId) {
        try {
            // Получение медицинских карт по ID пациента
            const medCards = await medcardMapping.findAll({
                where: {
                    ID_patient: patientId
                }
            });

            return medCards;
        } catch (error) {
            throw new Error(`Error getting medical cards by patient ID: ${error.message}`);
        }
    }


    

    async update(id, data, doc) {
        const card = await medcardMapping.findByPk(id)
        if (!card) {
            throw new Error('Мед. карта  не найдена в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(doc)
        // если загружено новое изображение — надо удалить старое
        if (file && card.Card) {
            FileService.delete(card.Card)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_card = card.ID_card,
            Date_create = card.Date_create,
            ID_patient = card.ID_patient,
            Card = file ? file : card.Card
        } = data
        await card.update({ID_card, Card, ID_patient,Date_create})
        return card
    }

    async delete(id) {
        const card = await medcardMapping.findByPk(id)
        if (!card) {
            throw new Error('Мед. карта  не найдена в БД')
        }
        await card.destroy()
        return card
    }
}

export default new MedCard()