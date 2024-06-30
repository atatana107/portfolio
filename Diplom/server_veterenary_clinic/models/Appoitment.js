import { appoitment as appoitmentMapping } from '../models/mapping.js';
import { service as serviceMapping } from '../models/mapping.js';
import {doctors as doctorMapping} from '../models/mapping.js';
import {owners as ownersMapping} from '../models/mapping.js';
import { cities as citiesMapping } from '../models/mapping.js'; 
import {subservice as subserviceMapping} from '../models/mapping.js';
import AppError from '../errors/AppError.js';
//import FileService from '../services/File.js';

class Appoitment {
    async getAll(req, res) {
        const appoitment = await appoitmentMapping.findAll()
        return appoitment
    }
    async getAllAppoitmentforAdmin(req, res) {
        const appoitment = await appoitmentMapping.findAll({
            include: [{
                model: serviceMapping,
            }, 
            {
                model: doctorMapping
            },
            {
                model: ownersMapping
            },
            {
                model: citiesMapping
            },
            {
                model:subserviceMapping
            }

        ]
        })
        return appoitment
    }

    async getDoctorsByCityAndService(req, res) {

        const { cityId, serviceId } = req.query;

        try {
            const whereClause = {};
            if (cityId) {
                whereClause.ID_city = cityId;
            }
            if (serviceId) {
                whereClause.ID_service = serviceId;
            }

            // Шаг 1: Получаем записи по городу и направлению
            const appointments = await appoitmentMapping.findAll({
                where: whereClause,
                include: [{
                    model: serviceMapping,
                }, {
                    model: doctorMapping
                }]
            });

            // Шаг 2: Извлекаем уникальные ID врачей из записей
            const uniqueDoctorsIds = [...new Set(appointments.map(app => app.doctor.ID_doctor))];

            // Шаг 3: Находим и возвращаем данных о врачах по полученным идентификаторам
            const doctors = await doctorMapping.findAll({
                where: {
                    ID_doctor: uniqueDoctorsIds
                }
            });

            // Возвращаем данные о врачах в формате JSON
            res.json(doctors);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    async getAppointmentsByCityServiceAndDoctor(req, res) {
        const { cityId, serviceId, doctorId } = req.query;
    
        try {
            const whereClause = {};
            if (cityId) {
                whereClause.ID_city = cityId;
            }
            if (serviceId) {
                whereClause.ID_service = serviceId;
            }
            if (doctorId) {
                whereClause.ID_doctor = doctorId; // Убедитесь, что это правильное поле в вашей модели
            }
    
            // Получаем записи по городу, направлению и врачу
            const appointments = await appoitmentMapping.findAll({
                attributes: ['Date_appoitment'],
                where: whereClause});
            // Возвращаем данные о записях в формате JSON
            res.json(appointments);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
    

    async getOne(id) {
        const appoitment = await appoitmentMapping.findByPk(id)
        if (!appoitment) {
            throw new Error('Запись не найдена в БД')
        }
        return appoitment
    }

    async create(data, doc) {
        const{ID_doctor, 
              ID_owner, 
              Date_appoitment='',
              Cost,
              ID_service,
              ID_subservice,
              State_reservation='',
              ID_city}  = data
        const appoitment = await appoitmentMapping.create
        ({
          ID_doctor, 
          ID_owner, 
          Date_appoitment,
          ID_subservice,
          Cost,
          ID_service,
          State_reservation,
          ID_city})
        return appoitment
    }

    async update(id, data, doc) {
        const appoitment = await appoitmentMapping.findByPk(id)
        if (!appoitment) {
            throw new Error('Запись не найдена в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_doctor = appoitment.ID_doctor,
            ID_owner = appoitment.ID_owner,
            Date_appoitment = appoitment.Date_appoitment,
            ID_service = appoitment.ID_service,
            ID_subservice = appoitment.ID_subservice,
            State_reservation = appoitment.State_reservation,
            ID_city = appoitment.ID_city
        } = data
        await appoitment.update({ID_doctor, ID_owner, ID_subservice,Date_appoitment,ID_service,State_reservation,ID_city})
        return appoitment
    }

    async updateForUser(id, data, doc) {
        const appoitment = await appoitmentMapping.findByPk(id)
        if (!appoitment) {
            throw new Error('Запись не найдена в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            Cost = appoitment.Cost,
            ID_subservice = appoitment.ID_subservice,
            ID_owner = appoitment.ID_owner,
            State_reservation = 1
        } = data
        await appoitment.update({ID_owner, Cost,ID_subservice,State_reservation})
        return appoitment
    }
    
    async cancellationByUser(id, data, doc) {
        const appoitment = await appoitmentMapping.findByPk(id)
        if (!appoitment) {
            throw new Error('Запись не найдена в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            Cost = appoitment.Cost,
            ID_subservice = appoitment.ID_subservice,
            ID_owner = appoitment.ID_owner,
            State_reservation = 0
        } = data
        await appoitment.update({ID_owner, Cost,ID_subservice,State_reservation})
        return appoitment
    }

    async delete(id) {
        const appoitment = await appoitmentMapping.findByPk(id)
        if (!appoitment) {
            throw new Error('Запись не найдена в БД')
        }
        await appoitment.destroy()
        return appoitment
    }



    async getServicesByCity(cityId) {
        try {
            // Получаем все записи по ID города, включая связанные с ними сервисы и врачей
            const appoitments = await appoitmentMapping.findAll({
                where: { ID_city: cityId,
                        State_reservation:0
                 },
                include: [
                    {
                        model: serviceMapping
                    }
                ]
            });

            const uniqueServicesMap = new Map();
            appoitments.forEach(appointment => {
                const service = appointment.service;
                if (service && !uniqueServicesMap.has(service.ID_service)) {
                    uniqueServicesMap.set(service.ID_service, service);
                }
            });
    
            // Преобразуем Map в массив для удобной работы
            const uniqueServices = Array.from(uniqueServicesMap.values());
    
            return uniqueServices;
        } catch (e) {
            throw new Error(e.message);
        }
    }


    async getDoctorsByCity(cityId) {
        try {
            // Получаем все записи по ID города, включая связанные с ними сервисы и врачей
            const doctors = await appoitmentMapping.findAll({
                where: { ID_city: cityId,
                         State_reservation:0
                },
                include: [
                    {
                        model: doctorMapping
                    }
                ]
            });

            // Извлекаем уникальные сервисы, связанные с записями в этом городе
            const uniqueDoctorMap = new Map();
            doctors.forEach(appointment => {
                const doctor = appointment.doctor;
                if (doctor && !uniqueDoctorMap.has(doctor.ID_doctor)) {
                    uniqueDoctorMap.set(doctor.ID_doctor, doctor);
                }
            });
    
            // Преобразуем Map в массив для удобной работы
            const uniqueDoctors = Array.from(uniqueDoctorMap.values());
    
            return uniqueDoctors;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async findOneByParameters(ID_service, ID_doctor, Date_appoitment, ID_city) {
        const appointment = await appoitmentMapping.findOne({
            where: {
                ID_service: ID_service,
                ID_doctor: ID_doctor,
                Date_appoitment: Date_appoitment,
                ID_city: ID_city,
                State_reservation: 0 
            }
        });
    
        return appointment;
    }
    
}

export default new Appoitment()