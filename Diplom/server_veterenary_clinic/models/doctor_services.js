import { doctor_services as doctor_services } from './mapping.js'
import { doctors as doctorsMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class DoctorService {
    async getAll(ID_doctor) {
        const doctor = await doctorsMapping.findByPk(ID_doctor)
        if (!ID_doctor) {
            throw new Error('Доктор не найден в БД')
        }
        const service = await doctor_services.findAll({where: {ID_doctor}})
        return service
    }


    async getOne(ID_doctor, ID_service) {
        const doctor = await doctorsMapping.findByPk(ID_doctor)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        const service = await doctor_services.findOne({where: {ID_doctor, ID_service}})
        if (!service) {
            throw new Error('Услуга доктора не найдена в БД')
        }
        return service
    }

    async create(IDdoctor, data) {
        const doctor = await doctorsMapping.findByPk(IDdoctor)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        const {ID_service, ID_doctor} = data
        const service = await doctor_services.create({ID_service, ID_doctor})
        return service
    }

    async update(doctorId, id, data) {
        const doctor = await doctorsMapping.findByPk(doctorId)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        const service = await doctor_services.findOne({where: {doctorId, id}})
        if (!service) {
            throw new Error('Услуга доктора не найдена в БД')
        }
        const {ID_service = service.ID_service, ID_doctor = service.ID_doctor} = data
        await service.update({ID_service, ID_doctor})
        return service
    }

    async delete(doctorId, id) {
        const doctor = await doctorsMapping.findByPk(doctorId)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        const service = await doctor_services.findOne({where: {doctorId, id}})
        if (!service) {
            throw new Error('Услуга доктора не найдена в БД')
        }
        await service.destroy()
        return service
    }
}

export default new DoctorService()