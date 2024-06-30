import { patient as PatientMapping } from '../models/mapping.js';
import { owners as ownerMapping } from './mapping.js'
import { medical_card as medCardMapping } from '../models/mapping.js';
import { analyzes as AnalizeMappong } from '../models/mapping.js';
import FileService from '../services/File.js';
import AppError from '../errors/AppError.js';

class Patient {
    async getAll() {
        
        const patients = await PatientMapping.findAll({
            include: [
                {
                    model: medCardMapping,
                    include: [AnalizeMappong]
                }
            ]
        }
        );
        return patients;
     }

    async getOne(id) {
        const patient = await PatientMapping.findByPk(id)
        if (!patient) {
            throw new Error('Пациент не найден в БД')
        }
        return patient


    }

    async create(data, image) {
        const img = FileService.save(image) ?? ''
        const {ID_patient,ID_owner, Name='',Gender,Type,Breed,Age,Type_age} = data
        const patient = await PatientMapping.create({ID_owner,Name, img,ID_patient,Gender,Type,Breed,Age,Type_age})
        return patient
    }

    async update(id, data, image) {
        const patient = await PatientMapping.findByPk(id)
        if (!patient) {
            throw new Error('Пациент не найден в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            ID_owner = patient.ID_owner,
            Name = patient.Name,
            ID_patient = patient.ID_patient,
            Gender = patient.Gender,
            Type = patient.Type,
            Breed = patient.Breed,
            Age = patient.Age,
            Type_age = patient.Type_age
        } = data
        await patient.update({ID_owner,Name, ID_patient,Gender,Type,Breed,Age,Type_age})
        return patient
    }

    async delete(id) {
        const patient = await PatientMapping.findByPk(id)
        if (!patient) {
            throw new Error('Пациент не найден в БД')
        }
        await patient.destroy()
        return patient
    }
}

export default new Patient()