import Owner from '../models/Owner.js'
import AppError from '../errors/AppError.js';
import Patient from '../models/Patient.js';
import medCard from '../models/medCard.js';
import bcrypt from 'bcrypt';
import Analize from '../models/Analize.js';
import jwt from 'jsonwebtoken';
import FileService from '../services/File.js';
import { analyzes } from '../models/mapping.js';


const makeJwt = (ID_owner, Login, role) => {
    return jwt.sign(
        {ID_owner, Login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class Owners {
    
    async getAll(req, res, next) 
    {
        try 
        {
            const owner = await Owner.getAll(req.params)
            res.json(owner)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id владельца')
            }
            const owner = await Owner.getOne(req.params.id)
            if (!owner) 
            {
                throw new Error('Владелец не найден в БД')
            }
            res.json(owner)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }


    async getAllPetsWithMedCardsByOwnerId(req, res, next) {
        try {
            const ownerId = req.params.ownerId;
            const pets = await Owner.getAllPetsByOwnerId(ownerId);
    
            if (!pets || pets.length === 0) {
                return res.status(404).send('Pets not found');
            }
    
            const petsWithMedCards = [];
            for (const pet of pets) {
                const medicalCards = await medCard.getByPatientId(pet.ID_patient);
                const medCardsWithAnalyses = [];
                for (const medcard of medicalCards) {
                    const analyses = await Analize.getByMedCardId(medcard.ID_card); // Замените это на актуальный метод, вызывающий анализы по ID карты
                    medCardsWithAnalyses.push({
                        MedicalCardInfo: medcard,
                        Analyzes: analyses
                    });
                }
                petsWithMedCards.push({
                    Patient: pet,
                    MedicalCard: medCardsWithAnalyses
                });
            }
            res.json(petsWithMedCards);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
     

    async create(req, res, next) 
    {
        // const { ID_owner, Name, Surname, Patronymic,City,Street, Phone, Information, House, Login, Password, role = 'USER' } = req.body;
        // try 
        // {
        //     if (!Login || !Password) {
        //         throw new Error('Пустой логин или пароль')
        //     }
        //     if ( ! ['USER', 'ADMIN'].includes(role)) {
        //         throw new Error('Недопустимое значение роли')
        //     }
        //     if (!req.body.ID_owner) 
        //     {
        //         throw new Error('Не указан id владельца')
        //     }
        //     const hash = await bcrypt.hash(Password, 5)
        //     if (!req.files || !req.files.image) {
        //         return next(AppError.badRequest('Изображение не предоставлено'));
        //     }
        //     const { image } = req.files; // Предположим здесь хранится изображение
        //     const img = image ? await FileService.save(image) : ''; 
        //     const owner  = await Owner.create({ID_owner,Name, Surname,Patronymic,City,Street,Phone,Information,House, Login, Password: hash, role, img})
        //     res.json(owner)
        //     } catch(e) 
        //     {
        //         next(AppError.badRequest(e.message))
        //     }
        try 
        {
            const { Password, ...rest } = req.body;
            const hash = await bcrypt.hash(Password, 5);
            const newData = { ...rest, Password: hash };
            const owner = await Owner.create(newData, req.files?.img)
            res.json(owner)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) 
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id владельца')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            // let {Login, Password, role} = req.body
            // if (role && !['USER', 'ADMIN'].includes(role)) {
            //     throw new Error('Недопустимое значение роли')
            // }
            // if (Password) {
            //     Password = await bcrypt.hash(Password, 5)
            // }
            const owner  = await Owner.update(req.params.id,req.body,req.files?.img)
            res.json(owner)
            } catch(e) 
            {
                next(AppError.badRequest(e.message))
            }
    }

    async delete(req, res, next)
    {
        try 
        {
            if (!req.params.id) 
            {
                throw new Error('Не указан id владельца')
            }
            const owner = await Owner.delete(req.params.id)
            res.json(owner)
        } 
        catch(e) 
        {
            next(AppError.badRequest(e.message))
        }
    }
    
    async signup(req, res, next) {
        const {Login, Password, role = 'USER'} = req.body
        try {
            if (!Login || !Password) {
                throw new Error('Пустой логин или пароль')
            }
            if (role !== 'USER') {
                throw new Error('Возможна только роль USER')
            }
            const hash = await bcrypt.hash(Password, 5)
            const owner = await Owner.create({Login, Password: hash, role})
            const token = makeJwt(owner.ID_owner, owner.Login, owner.role)
            return res.json({token})
        }
        catch(e)
        {
            next(AppError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {Login, Password} = req.body
            const user = await Owner.getByLogin(Login)
            let compare = bcrypt.compareSync(Password, user.Password)
            if (!compare) {
                throw new Error('Указан неверный пароль')
            }
            const token = makeJwt(user.ID_owner, user.Login, user.role)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    
    async check(req, res, next) {
        const token = makeJwt(req.auth.ID_owner, req.auth.Login, req.auth.role)
        return res.json({token})
    }


    async registration(req, res, next) {
        const {Name, Surname, Patronymic, Phone, Password, Login, role = 'USER', Information} = req.body
        try {
            if (!Login || !Password || !Name || !Phone || !Surname || !Patronymic ||!Information) {
                return next(AppError.badRequest('Заполните все поля'))
            }
            if (role !== 'USER') {
                throw new Error('Возможна только роль USER')
            }
            const hashPassword = await bcrypt.hash(Password, 5)
            const user = await Owner.create({Name, Surname, Patronymic, Phone, Password: hashPassword, Login, role, Information})
            const token = makeJwt(user.ID_owner, user.Login, user.role)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }



    async getAllPetsByOwnerId(req, res, next) {
        try {
            const ownerId = req.params.ownerId;
            const pets = await Owner.getAllPetsByOwnerId(ownerId);
            res.json(pets);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
}

export default new Owners()