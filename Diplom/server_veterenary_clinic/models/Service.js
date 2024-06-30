import { service as serviceMapping } from './mapping.js'
import {subservice as subserviceMapping} from './mapping.js'
import FileService from '../services/File.js';
import AppError from '../errors/AppError.js'

class Service {
    async getAll() {
        const service = await serviceMapping.findAll(
            { include:[
                {model:subserviceMapping}
            ]}
        )
        const servicesWithSubserviceCount = service.map(service => {
            const subserviceCount = service.subservices ? service.subservices.length : 0;
            return { ...service.toJSON(), subserviceCount };
        });
    
        return servicesWithSubserviceCount;
        //return service
    }

    async getOne(id) {
        const service = await serviceMapping.findOne({
            where: {ID_service:id},
            include: 
            [{model: subserviceMapping}]
        })
        if (!service) {
            throw new Error('Услуга не найдена в БД')
        }
        const subserviceCount = service.subservices ? service.subservices.length : 0;
        return { ...service.dataValues, subserviceCount };
    }

    async create(data, image) {
        const img = FileService.save(image) ?? ''
        const {ID_service, Service_name} = data
        const service = await serviceMapping.create({ID_service, Service_name,img})
        return service
    }

    async update(id, data, image) {
        const service = await serviceMapping.findByPk(id)
        if (!service) {
            throw new Error('Услуга не найдена в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(image)
        // если загружено новое изображение — надо удалить старое
        if (file && service.img) {
            FileService.delete(service.img)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_service = service.ID_service,
            Service_name = service.Service_name,
            img = file ? file : service.img
        } = data
        await service.update({ID_service, Service_name, img})
        return service
    }

    async delete(id) {
        const service = await serviceMapping.findByPk(id)
        if (!service) {
            throw new Error('Услуга не найдена в БД')
        }
        await service.destroy()
        return service
    }

    async getAllSubservicesByService(serviceId) {
        const subservices = await subserviceMapping.findAll({
            where: { ID_service:serviceId } // Убедитесь, что используется корректное поле
        });
        if (!subservices) {
            throw new Error('Услуга не найдена в БД')
        }
        return subservices;
    }
}

export default new Service()