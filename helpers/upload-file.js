const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], dir = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

    
        if (!validExtensions.includes(extension)) {
            return reject(`Extension ${extension} not allowed, (${validExtensions}).`);
        }
    
        const nameTmp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', dir, nameTmp);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject({err});
            }
    
            resolve(nameTmp);
        });
    });
};

module.exports = {
    uploadFile
}