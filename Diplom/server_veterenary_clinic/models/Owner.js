import { owners as ownerMapping } from '../models/mapping.js';
import { patient as PatientMapping} from '../models/mapping.js';
import { appoitment as appoitmentMapping} from '../models/mapping.js';
import { subservice as subserviceMapping } from '../models/mapping.js';
import { doctors as doctorMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class Owner {
    async getAll(params) {
        const {patientId} = params
        const where = {role: 'USER'}
        if (patientId) where.patientId = patientId
        const owner = await ownerMapping.findAll({where})
        return owner
        // const owner = await ownerMapping.findAll()
        // return owner
    }
    async getAllPetsByOwnerId(req, res, next) {
        try {
            const ownerId = req.params.ownerId;
            const pets = await PatientMapping.getAllPetsByOwnerId(ownerId);
            res.json(pets);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getAllDoctorsWithServices(req, res, next) {
        try {
            const doctors = await Doctor.getAllDoctorsWithServices();
            res.json(doctors);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getOne(id) {

        const owner = await ownerMapping.findByPk(id,{
            include: [{
                model: appoitmentMapping,
                include: [
                    {
                        model: subserviceMapping
                    },
                    {
                        model: doctorMapping
                    }
                ]
            }]
        });
        if (!owner) {
            throw new Error('Владелец не найден в БД')
        }
        return owner
    }

    async create(data, image) {
        const img = FileService.save(image) ?? ''
        const {Name='', Surname='',Patronymic,City,Street,Phone,House,Login='',Password='',Information,role='USER'} = data
        const owner = await ownerMapping.create({Name,img, Surname,Patronymic,City,Street,Phone,Information,House,Login,Password,role})
        return owner
    }

    async update(id, data, image) {
        const owner = await ownerMapping.findByPk(id)
        if (!owner) {
            throw new Error('Владелец не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(image)
        // если загружено новое изображение — надо удалить старое
        if (file && owner.img) {
            FileService.delete(owner.img)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            Name = owner.Name,
            Surname = owner.Surname,
            Patronymic = owner.Patronymic,
            // City = owner.City,
            // Street = owner.Street,
            Phone = owner.Phone,
            // House = owner.House,
            // Login = owner.Login,
            // Password = owner.Password,
            // role = owner.role,
            Information = owner.Information,
            img = file ? file : owner.img
        } = data
        await owner.update({Name,img, Surname,Patronymic,Phone,Information})
        return owner
    }

    async delete(id) {
        const owner = await ownerMapping.findByPk(id)
        if (!owner) {
            throw new Error('Владелец не найден в БД')
        }
        await owner.destroy()
        return owner
    }    
    
    async getByLogin(Login) {
        const owner = await ownerMapping.findOne({where: {Login}})
        if (!owner) {
            throw new Error('Пользователь не найден в БД')
        }
        return owner
    }

    async getAllPetsByOwnerId(ownerId) {
        const pets = await PatientMapping.findAll({
            where: { ID_owner: ownerId }
        });
        return pets;
    }
}

export default new Owner()