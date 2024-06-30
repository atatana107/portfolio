import { guestInstance, authInstance } from './index.js';

export const getAllAppoitmentCity = async()=> {
    try {
        const response = await authInstance.get('city/getall');
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении записей городов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении записей городов:', e);
        return null;
    }
}
export const getAllAppoitmentForAdmin = async()=> {
  try {
      const response = await authInstance.get('appoitment/admin/getall');
      if (response.status === 200) {
          return response.data;
      } else {
          console.error('Ошибка при получении записей:', response.statusText);
          return null;
      }
  } catch (e) {
      console.error('Ошибка при получении записей:', e);
      return null;
  }
}

export const getAllAppoitment = async(ID_city, ID_service,ID_doctor,Date_appoitment)=> {
  try {
    const response = await guestInstance.get(`appoitment/appointmentsByParam`, {
      params: {
        ID_city: ID_city,
        ID_service: ID_service,
        ID_doctor:ID_doctor,
        Date_appoitment:Date_appoitment
      }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Ошибка при получении врачей:', response.statusText);
      return null;
    }
  } catch (e) {
    console.error('Ошибка при получении врачей:', e);
    return null;
  }
}


export const getOneCity = async(ID_city)=> {
    try {
        const response = await guestInstance.get(`appoitment/services/getall/${ID_city}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении направлений города:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении направлений города:', e);
        return null;
    }
}

export const getAllSubserviceByService = async(ID_service)=> {
    try {
        const response = await guestInstance.get(`services/${ID_service}/subservice/getall`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении услуг направления:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении услуг направления:', e);
        return null;
    }
}

export const getAllDoctorsByCityAndService = async (cityId, serviceId) => {
    try {
      const response = await guestInstance.get(`/appoitment/getdoctors`, {
        params: {
          cityId: cityId,
          serviceId: serviceId
        }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Ошибка при получении врачей:', response.statusText);
        return null;
      }
    } catch (e) {
      console.error('Ошибка при получении врачей:', e);
      return null;
    }
  };

  export const getAllAppoitmentByCityAndServiceandDoctor = async (cityId, serviceId,doctorId) => {
    try {
      const response = await guestInstance.get(`/appoitment/getappoitment`, {
        params: {
          cityId: cityId,
          serviceId: serviceId,
          doctorId:doctorId
        }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Ошибка при получении врачей:', response.statusText);
        return null;
      }
    } catch (e) {
      console.error('Ошибка при получении врачей:', e);
      return null;
    }
  };

  export const getAllAppoitmentByDoctor = async (ID_doctor) => {
    try {
      const response = await guestInstance.get(`doctor/appoitment/${ID_doctor}`, {
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Ошибка при получении врачей:', response.statusText);
        return null;
      }
    } catch (e) {
      console.error('Ошибка при получении врачей:', e);
      return null;
    }
  };


  //обновление записи(запись клиента)
  export const updateAppoitmentByUser = async (ID, appoitmentData) => {
    try {
        const response = await authInstance.put(`appoitment/owner/update/${ID}`, appoitmentData);
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Ошибка при обновлении записи на прием:', response.statusText);
          return null;
        }
      } catch (e) {
        console.error('Ошибка при обновлении записи на прием:', e);
        return null;
      }
};
  //отмена записи(запись клиента)
  export const cancellationByUser = async (ID, appoitmentData) => {
    try {
        const response = await authInstance.put(`appoitment/cancellation/owner/update/${ID}`, appoitmentData);
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Ошибка при отмене записи на прием:', response.statusText);
          return null;
        }
      } catch (e) {
        console.error('Ошибка при отмене записи на прием:', e);
        return null;
      }
};
// обновление записи для администратора
export const updateAppoitmentByAdmin = async (ID, appoitmentData) => {
  try {
      const response = await authInstance.put(`appoitment/update/${ID}`, appoitmentData);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Ошибка при обновлении записи на прием:', response.statusText);
        return null;
      }
    } catch (e) {
      console.error('Ошибка при обновлении записи на прием:', e);
      return null;
    }
};
// обновление записи для администратора
export const createAppoitmentByAdmin = async (appoitmentData) => {
  try {
      const response = await authInstance.post(`appoitment/create`, appoitmentData);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Ошибка при создании записи на прием:', response.statusText);
        return null;
      }
    } catch (e) {
      console.error('Ошибка при создании записи на прием:', e);
      return null;
    }
};




