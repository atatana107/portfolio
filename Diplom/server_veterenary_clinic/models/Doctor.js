import { doctors as doctorsMapping } from '../models/mapping.js';
import { doctor_services as ServiceDocMapping } from './mapping.js';
import { service as serviceMapping } from '../models/mapping.js';
import { certificate as certificateMapping } from '../models/mapping.js';
import { reviews as ReviewMapping } from '../models/mapping.js';
import {owners as ownerMapping} from '../models/mapping.js';
import { appoitment as appoitmentMapping } from '../models/mapping.js';
import FileService from '../services/File.js';
import AppError from '../errors/AppError.js';

class Doctor {
    async getAll() {
        const doctor = await doctorsMapping.findAll()
        return doctor
    }

    async getOne(id) {
        const doctor = await doctorsMapping.findOne({
            where: {ID_doctor:id},
            include: 
            [{model: certificateMapping},
             {model: ReviewMapping,
                include: [
                    { model: ownerMapping } // Добавление связи с владельцем отзыва
                ]
             }

            ]
        })
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        return doctor
    }

    async getOneDoctorAllAppoitment(id) {
        const doctor = await doctorsMapping.findOne({
            where: {ID_doctor:id},
            include: 
            [{model: appoitmentMapping}]
        })
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        return doctor
    }


    // async getAllDoctorsWithServices() {
    //     return await doctorsMapping.findAll({
    //         include: [{ model: ServiceDocMapping }]
    //     });
    // }

    async getAllDoctorsWithServices() {
        return await doctorsMapping.findAll({
            include: [{
                model: ServiceDocMapping,
                include: [serviceMapping]
            }]
        });
    }


    async create(data, image) {
        const img = FileService.save(image) ?? ''
        const {ID_doctor, Name='', Surname='',Patronymic,Date_birth,Experience,Phone,Information} = data
        const doctor = await doctorsMapping.create({ID_doctor,Name, Surname,Patronymic,Date_birth,Experience,Phone,Information,img})
        if (data.props) { // услуги доктора
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ServiceDocMapping.create({
                    ID_service: prop.serviceID,
                    ID_doctor: doctor.ID_doctor
                })
            }
        }
        return doctor
    }

    async update(id, data, image) {
        const doctor = await doctorsMapping.findByPk(id)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(image)
        // если загружено новое изображение — надо удалить старое
        if (file && doctor.img) {
            FileService.delete(doctor.img)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_doctor = doctor.ID_doctor,
            Name = doctor.Name,
            Surname = doctor.Surname,
            Patronymic = doctor.Patronymic,
            Date_birth = doctor.Date_birth,
            Experience = doctor.Experience,
            Phone = doctor.Phone,
            Information = doctor.Information,
            img = file ? file : doctor.img
        } = data
        await doctor.update({ID_doctor,Name, Surname,Patronymic,Date_birth,Experience,Phone,Information,img})
        return doctor
    }

    async delete(id) {
        const doctor = await doctorsMapping.findByPk(id)
        if (!doctor) {
            throw new Error('Доктор не найден в БД')
        }
        await doctor.destroy()
        return doctor
    }


    async getAllCertificateByDoctorId(doctorId) {
        const doctors = await certificateMapping.findAll({
            where: { ID_doctor: doctorId }
        });
        return doctors;
    }
}

export default new Doctor()