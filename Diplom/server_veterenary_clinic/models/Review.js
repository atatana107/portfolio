import { reviews as ReviewMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Reviews {
    async getAll() {
        const reviews = await ReviewMapping.findAll()
        return reviews
    }

    async getOne(id) {
        const reviews = await ReviewMapping.findByPk(id)
        if (!reviews) {
            throw new Error('Отзыв не найден в БД')
        }
        return reviews
    }

    async create(data, img) {
        const {Review, ID_doctor, ID_owner} = data
        const review = await ReviewMapping.create({Review, ID_doctor, ID_owner})
        return review
    }

    async update(id, data, img) {
        const review = await ReviewMapping.findByPk(id)
        if (!review) {
            throw new Error('Отзыв не найден в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID = review.ID,
            Review = review.Review,
            ID_doctor = review.ID_doctor,
            ID_owner = review.ID_owner
        } = data
        await review.update({ID, Review, ID_doctor, ID_owner})
        return review
    }

    async delete(id) {
        const review = await ReviewMapping.findByPk(id)
        if (!review) {
            throw new Error('Отзыв не найден в БД')
        }
        await review.destroy()
        return review
    }
}

export default new Reviews()