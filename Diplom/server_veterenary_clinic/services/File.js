import * as uuid from 'uuid'
import * as path from 'path'
import fs from 'fs'

class File {
    save(file) {
        if (!file) return null
        const [, ext] = file.mimetype.split('/')
        const fileName = uuid.v4() + '.' + ext
        const filePath = path.resolve('filesPDF', fileName)
        file.mv(filePath)
        return fileName
    }
    delete(file) {
        if (file) {
            const filePath = path.resolve('filesPDF', file)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }
    }
    // save(file) {
    //     if (!file) return null;
    //     const fileName = file.originalname; // Изменение здесь
    //     const filePath = path.resolve('static', fileName);
    //     file.mv(filePath);
    //     return fileName;
    // }
}


export default new File()
// class File {
//     save(file) {
//         if (!file) return null;

//         const [, ext] = file.mimetype.split('/');
//         const fileName = uuid.v4() + '.' + ext;
//         const filePath = path.resolve('static', fileName);

//         file.mv(filePath);

//         // Чтение содержимого файла и преобразование его в двоичные данные
//         const fileContent = fs.readFileSync(filePath);
//         const binaryData = Buffer.from(fileContent);

//         return binaryData;
//     }
// }

// export default new File()