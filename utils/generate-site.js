const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the .catch()
            if (err) {
                reject(err); 
                // return out of the function here to make sure the Promise doesn't execute the resolve() function
                return;
            }

            // if everything went well, resolve Promise
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: 'File copied!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };