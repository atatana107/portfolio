import { cities as cityMapping } from './mapping.js';
import {appoitment as appoitmentMapping} from './mapping.js'
import { service as serviceMapping } from '../models/mapping.js';
import {doctors as doctorMapping} from '../models/mapping.js';
import {subservice as subserviceMapping} from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class City {
    async getAll() {
        const city = await cityMapping.findAll(
            // {
            // include: {
            //     model: appoitmentMapping,
            //     include: [
            //         {
            //             model: doctorMapping,
            //         },
            //         {
            //             model: serviceMapping,
            //             include: subserviceMapping, // Включите подсервисы в модель сервисов
            //         }
            //     ]
            // }
            
            // }
        )
        return city
    }

    async getOne(id) {
        const city = await cityMapping.findOne({
            where: {ID_city:id},
            include: {
                model: appoitmentMapping,
                include: [
                    {
                        model: doctorMapping,
                    },
                    {
                        model: serviceMapping,
                        include: subserviceMapping, // Включите подсервисы в модель сервисов
                    }
                ]
            }
        })
        if (!city) {
            throw new Error('Город не найден в БД')
        }
        return city
    }

    async create(data) {
        const {ID_city, City} = data
        const city = await cityMapping.create({ID_city, City})
        return city
    }

    async update(id, data, img) {
        const city = await cityMapping.findByPk(id)
        if (!city) {
            throw new Error('Город не найден в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_city = city.ID_city,
            City = city.City
        } = data
        await city.update({ID_city, City})
        return city
    }

    async delete(id) {
        const city = await cityMapping.findByPk(id)
        if (!city) {
            throw new Error('Город не найден в БД')
        }
        await city.destroy()
        return city
    }
}

export default new City()