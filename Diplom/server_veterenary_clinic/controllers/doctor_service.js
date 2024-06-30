import DoctorService from '../models/doctor_services.js'
import AppError from '../errors/AppError.js'

class DoctorServices {
    async getAll(req, res, next) {
        try {
            if (!req.params.ID_doctor) {
                throw new Error('Не указан id доктора')
            }
            const service = await DoctorService.getAll(req.params.ID_doctor)
            res.json(service)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }



    async getOne(req, res, next) {
        try {
            if (!req.params.ID_doctor) {
                throw new Error('Не указан id доктора')
            }
            if (!req.params.ID_service) {
                throw new Error('Не указано id сервиса')
            }
            const service = await DoctorService.getOne(req.params.ID_doctor, req.params.ID_service)
            res.json(service)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.params.IDdoctor) {
                throw new Error('Не указан id доктора')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const service = await DoctorService.create(req.params.IDdoctor, req.body)
            res.json(service)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.doctorId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id услуги врача')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const service = await DoctorService.update(req.params.doctorId, req.params.id, req.body)
            res.json(service)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.doctorId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id услуги врача')
            }
            const service = await DoctorService.delete(req.params.doctorId, req.params.id)
            res.json(service)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new DoctorServices()