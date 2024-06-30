import { subservice as subserviceMapping } from './mapping.js'
import { service as serviceMapping} from './mapping.js'
import {doctor_services as doctorServiceMapping} from './mapping.js'
import { doctors as doctorMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Subservice {
    async getAll() {
        const subservice = await subserviceMapping.findAll()
        return subservice
    }

    async getOne(id) {
        const subservice = await subserviceMapping.findOne({
            where: { ID_subservice: id },
            include: [
                { 
                    model: serviceMapping,
                    include: [
                        {
                            model: doctorServiceMapping,
                            include: [
                                doctorMapping // Добавляем третью таблицу doctorsMapping
                            ]
                        }
                    ]
                }
            ]
        })
        if (!subservice) {
            throw new Error('Подуслуга не найдена в БД')
        }
        return subservice
    }

    async create(data) {
        const {ID_subservice, Subervice_name, Price, ID_service} = data
        const subservice = await subserviceMapping.create({ID_subservice, Subervice_name, Price, ID_service})
        return subservice
    }

    async update(id, data) {
        const subservice = await subserviceMapping.findByPk(id)
        if (!subservice) {
            throw new Error('Подуслуга не найдена в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_subservice = subservice.ID_subservice,
            Subervice_name = subservice.Subervice_name,
            Price = subservice.Price,
            ID_service = subservice.ID_service
        } = data
        await subservice.update({ID_subservice, Subervice_name, Price, ID_service})
        return subservice
    }

    async delete(id) {
        const subservice = await subserviceMapping.findByPk(id)
        if (!subservice) {
            throw new Error('Подуслуга не найдена в БД')
        }
        await subservice.destroy()
        return subservice
    }
}

export default new Subservice()