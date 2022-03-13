const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// membuat folder
const filePath = './data';
const dataPath = `${filePath}/contacts.json`;
if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
};

// membuat dile contacts.json
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// Buat pertanyaan
// const pertanyaan = tulisPertanyaan =>{
//     return new Promise((resolve, rejects)=>{
//         rl.question(tulisPertanyaan, variabel =>{
//             resolve(variabel);
//         });
//     });
// };

// simpan contact
const simpanContact = (nama, no, email) =>{
    const dataUser = {nama, no, email};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const x = JSON.parse(file);
    
    // cek duplikat
    const duplikat = x.find((dataUser) => dataUser.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // Cek email menggunakan npm validator
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.bold.inverse("Email invalid"))
            return false;
        }
    }

    // cek no hp
    if(!validator.isMobilePhone(no, 'id-ID')){
        console.log(chalk.red.inverse.bold("Nomer Hp invalid"));
        return false;
    }

    x.push(dataUser);
    fs.writeFileSync('data/contacts.json', JSON.stringify(x));
    console.log('Data sudah masuk');
    // rl.close();
}

module.exports = {simpanContact};