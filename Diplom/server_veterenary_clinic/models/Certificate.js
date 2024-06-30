import { certificate as certificateMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class Certificate {
    async getAll() {
        const {doctorId} = params
        const where = {}
        if (doctorId) where.doctorId = doctorId
        const certificate = await certificateMapping.findAll({where})
        return certificate
    }

    async getOne(id) {
        const certificate = await certificateMapping.findByPk(id)
        if (!certificate) {
            throw new Error('Сертиикат не найден в БД')
        }
        return certificate
    }

    async create(data, doc) {
        // поскольку doc не допускает null, задаем пустую строку
        const Certificate = FileService.save(doc) ?? ''
        const {ID_certificate='', Create_time, ID_doctor, comment=''} = data
        const certificate = await certificateMapping.create({ID_certificate, Create_time,ID_doctor,comment, Certificate})
        return certificate
    }

    async update(id, data, doc) {
        const certificate = await certificateMapping.findByPk(id)
        if (!certificate) {
            throw new Error('Сертиикат не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(doc)
        // если загружено новое изображение — надо удалить старое
        if (file && certificate.Certificate) {
            FileService.delete(certificate.Certificate)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_certificate = certificate.ID_certificate,
            Create_time = certificate.Create_time,
            ID_doctor = certificate.ID_doctor,
            Certificate = file ? file : certificate.Certificate
        } = data
        await certificate.update({ID_certificate, Create_time,ID_doctor, Certificate})
        return certificate
    }

    async delete(id) {
        const certificate = await certificateMapping.findByPk(id)
        if (!certificate) {
            throw new Error('Сертиикат не найден в БД')
        }
        await certificate.destroy()
        return certificate
    }
}

export default new Certificate()