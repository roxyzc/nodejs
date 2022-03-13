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

// membuat file contacts.json
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

// Membaca json
const loadContact = () =>{
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const x = JSON.parse(file);
    return x;
}


// simpan contact
const simpanContact = (nama, email, noHP) =>{
    const dataUser = {nama, noHP, email};
    const x = loadContact();
    
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

    // cek noHP hp
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold("Nomer Hp invalid"));
        return false;
    }

    x.push(dataUser);
    fs.writeFileSync('data/contacts.json', JSON.stringify(x));
    console.log('Data sudah masuk');
    // rl.close();
}

const listContact = () =>{
    const x = loadContact();
    x.forEach((contact, index) => {
        console.log(`${index + 1}: ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = nama =>{
    const x = loadContact();

    const contact = x.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());
    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan`));
        return false;
    }
    console.log(`Detail dari ${nama}
    Nama: ${contact.nama} 
    No Hp: ${contact.noHP}
    ${(contact.email)? `Email: ${contact.email}` : ''}`)
}

const deleteContact = nama =>{
    const x = loadContact();
    const newContact = x.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(x.length === newContact.length){
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
    console.log(`${nama} berhasil dihapus`);
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};