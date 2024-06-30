import sequelize from '../sequelize.js'
import database from 'sequelize'
import Analize from './Analize.js'

const { DataTypes } = database


// модель «Доктора», таблица БД «doctors»
const doctors = sequelize.define('doctors', {
    ID_doctor: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Name: {type: DataTypes.STRING, allowNull: false},
    Surname: {type: DataTypes.STRING,allowNull: false},
    Patronymic: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    Date_birth: {type: DataTypes.DATE,allowNull: true},
    Experience: {type: DataTypes.INTEGER,allowNull: true},
    Phone: {type: DataTypes.STRING},
    Information: {type: DataTypes.STRING}
})

// модель «Записи», таблица БД «appoitment»
const appoitment = sequelize.define('appoitment', {
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    ID_doctor:  {type: DataTypes.INTEGER, allowNull: true },
    ID_owner: {type: DataTypes.INTEGER, allowNull: true },
    Date_appoitment: {type: DataTypes.DATE,allowNull: false},
    Cost: {type: DataTypes.INTEGER, allowNull: true },
    ID_service: {type: DataTypes.INTEGER, allowNull: true },
    ID_subservice: {type: DataTypes.INTEGER, allowNull: true },
    State_reservation: {type: DataTypes.INTEGER, allowNull: false},
    ID_city: {type: DataTypes.INTEGER, allowNull: true }
})

// модель «Город», таблица БД «city»
const cities = sequelize.define('cities', {
    ID_city: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    City: {type: DataTypes.STRING}
})

// модель «Услуги», таблица БД «service»
const service = sequelize.define('service', {
    ID_service: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Service_name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: true}
})

// модель «Подуслуги», таблица БД «subservice»
const subservice = sequelize.define('subservice', {
    ID_subservice: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Subervice_name: {type: DataTypes.STRING},
    Price: {type: DataTypes.INTEGER},
    ID_service: {type: DataTypes.INTEGER,allowNull: false}
})

// модель «Отзывы», таблица БД «reviews»
const reviews = sequelize.define('reviews', {
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Review: {type: DataTypes.STRING},
    ID_doctor: {type: DataTypes.INTEGER,allowNull: false},
    ID_owner: {type: DataTypes.INTEGER,allowNull: false}
})

// модель «Владельцы», таблица БД «owner»
const owners = sequelize.define('owners', {
    ID_owner: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false },
    Name: {type: DataTypes.STRING, allowNull: false},
    Surname: {type: DataTypes.STRING,allowNull: false},
    Patronymic: {type: DataTypes.STRING},
    City: {type: DataTypes.STRING},
    Street: {type: DataTypes.STRING},
    House: {type: DataTypes.STRING},
    Phone: {type: DataTypes.STRING},
    Information: {type: DataTypes.STRING},
    Login: {type: DataTypes.STRING, allowNull: false},
    Password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    img: {type: DataTypes.STRING, allowNull: true}

})

// модель «Пациенты», таблица БД «patient»
const patient = sequelize.define('patient', {
    ID_patient: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    ID_owner: {type: DataTypes.INTEGER, allowNull: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Gender: {type: DataTypes.STRING},
    Type: {type: DataTypes.STRING},
    Breed: {type: DataTypes.STRING},
    Age: {type: DataTypes.INTEGER, allowNull: true},
    Type_age: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}
})

// модель «Сертификаты», таблица БД «certificate»
const certificate = sequelize.define('certificate', {
    ID_certificate: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Certificate: {type: DataTypes.STRING},
    comment:{type: DataTypes.STRING, allowNull: false},
    Create_time: {type: DataTypes.DATE},
    ID_doctor: {type: DataTypes.INTEGER}
})

// модель «Мед. карты», таблица БД «medical_card»
const medical_card = sequelize.define('medical_card', {
    ID_card: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Card: {type: DataTypes.STRING},
    ID_patient: {type: DataTypes.INTEGER,allowNull: false},
    Date_create: {type: DataTypes.DATE,allowNull: true}
})

// модель «Анализы», таблица БД «medical_card»
const analyzes = sequelize.define('analyzes', {
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    Analyze: {type: DataTypes.STRING,allowNull: false},
    ID_card: {type: DataTypes.INTEGER,allowNull: false},
    Create_time: {type: DataTypes.DATE}
})

// // модель «Данные аккаунтов», таблица БД «account_data»
// const account_data = sequelize.define('account_data', {
//     ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
//     Login: {type: DataTypes.STRING, allowNull: false},
//     ID_owner: {type: DataTypes.INTEGER,allowNull: false},
//     Password: {type: DataTypes.STRING, allowNull: false}
// })

// модель «Услуги врачей(промежуточная)», таблица БД «service»
const doctor_services = sequelize.define('doctor_service', {
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false},
    ID_service: {type: DataTypes.INTEGER, allowNull:true},
    ID_doctor: {type: DataTypes.INTEGER, allowNull: true}
})

//описание связей


// Установка отношения "Один ко многим" для таблиц Доктор и Записи
doctors.hasMany(appoitment, { foreignKey: 'ID_doctor', onUpdate: 'CASCADE', onDelete: 'NO ACTION'  }); // Один врач может иметь много записей
appoitment.belongsTo(doctors, { foreignKey: 'ID_doctor' }); // Каждая запись принадлежит одному врачу

// Установка отношения "Один ко многим" для таблиц владелец и Записи
owners.hasMany(appoitment, { foreignKey: 'ID_owner', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'  }); // Один владелец может иметь много записей
appoitment.belongsTo(owners, { foreignKey: 'ID_owner' }); // Каждая запись принадлежит одному владельцу

// Установка отношения "Один ко многим" для таблиц пациенты и Записи
// patient.hasMany(appoitment, { foreignKey: 'ID_patient', onUpdate: 'CASCADE', onDelete: 'NO ACTION'  }); // Один владелец может иметь много записей
// appoitment.belongsTo(patient, { foreignKey: 'ID_patient' }); // Каждая запись принадлежит одному владельцу

// Установка отношения "Один ко многим" для таблиц услуги и Записи
service.hasMany(appoitment, { foreignKey: 'ID_service', onUpdate: 'CASCADE', onDelete: 'NO ACTION'  }); // Одна услуга может иметь много записей
appoitment.belongsTo(service, { foreignKey: 'ID_service' }); // одна услуга может иметь много записей

// Установка отношения "Один ко многим" для таблиц услуги и Записи
subservice.hasMany(appoitment, { foreignKey: 'ID_subservice', onUpdate: 'CASCADE', onDelete: 'NO ACTION'  }); // Одна услуга может иметь много записей
appoitment.belongsTo(subservice, { foreignKey: 'ID_subservice' }); // одна услуга может иметь много записей

// Установка отношения "Один ко многим" для таблиц город и Записи
cities.hasMany(appoitment, { foreignKey: 'ID_city', onUpdate: 'CASCADE', onDelete: 'NO ACTION'  }); // Одна услуга может иметь много записей
appoitment.belongsTo(cities, { foreignKey: 'ID_city' }); // одна услуга может иметь много записей

// // Установка отношения "Один ко многим" для таблиц данные аккаунтов и владельцы(если что потом изменить и в БД и тут)
// owner.hasMany(account_data, { foreignKey: 'ID_owner', onUpdate: 'RESTRICT', onDelete: 'CASCADE' });
// account_data.belongsTo(owner, { foreignKey: 'ID_owner' });

// Установка отношения "Один ко многим" для таблиц мед.карты  и анализы
medical_card.hasMany(analyzes, { foreignKey: 'ID_card', onUpdate: 'CASCADE', onDelete: 'NO ACTION' });
analyzes.belongsTo(medical_card, { foreignKey: 'ID_card' });

// Установка отношения "Один ко многим" для таблиц сертификаты и врачи
doctors.hasMany(certificate, {foreignKey: 'ID_doctor' , onUpdate: 'CASCADE', onDelete: 'NO ACTION' });
certificate.belongsTo(doctors, {foreignKey: 'ID_doctor' });

// Установка отношения "Один ко многим" для таблиц мед.карты и пациенты
patient.hasMany(medical_card, { foreignKey: 'ID_patient', onUpdate: 'CASCADE', onDelete: 'SET NULL' });
medical_card.belongsTo(patient, { foreignKey: 'ID_patient' });

// Установка отношения "Один ко многим" для таблиц владелец и пациенты
owners.hasMany(patient, { foreignKey: 'ID_owner', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
patient.belongsTo(owners, { foreignKey: 'ID_owner' });

// Установка отношения "Один ко многим" для таблиц отзывы и докторы
doctors.hasMany(reviews, { foreignKey: 'ID_doctor', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
reviews.belongsTo(doctors, { foreignKey: 'ID_doctor' });


// Установка отношения "Один ко многим" для таблиц отзывы и владельцы
owners.hasMany(reviews, { foreignKey: 'ID_owner', onUpdate: 'CASCADE', onDelete: 'RESTRICT' });
reviews.belongsTo(owners, { foreignKey: 'ID_owner' });

// Установка отношения "Один ко многим" для таблиц услуги и подуслуги
service.hasMany(subservice, { foreignKey: 'ID_service', onUpdate: 'CASCADE', onDelete: 'CASCADE'});
subservice.belongsTo(service, { foreignKey: 'ID_service' });

// Установка отношения "Один ко многим" для таблиц услуги и доктора
// service.belongsToMany(doctors, { through: doctor_service, foreignKey: 'ID_service', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
// doctors.belongsToMany(service, { through: doctor_service, foreignKey: 'ID_doctor', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

service.hasMany(doctor_services, { foreignKey: 'ID_service', onUpdate: 'CASCADE', onDelete: 'CASCADE'});
doctor_services.belongsTo(service, { foreignKey: 'ID_service' });

doctors.hasMany(doctor_services, { foreignKey: 'ID_doctor', onUpdate: 'CASCADE', onDelete: 'CASCADE'});
doctor_services.belongsTo(doctors, { foreignKey: 'ID_doctor' });

export {
    doctors,
    appoitment,
    cities,
    service,
    subservice,
    reviews,
    owners,
    patient,
    certificate,
    medical_card,
    analyzes,
    doctor_services
}