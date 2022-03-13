// Mengambil argumen dari command line
// const command = process.argv[2];
// if(command === 'add'){

// }else if(command === 'remove') {

// }else if(command === 'replace'){

// }


// menggunakan npm yargs
const yargs = require('yargs');
const contact = require('./contacts');
const { simpanContact } = require('./contacts');
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder:{
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();

// Menampilkan daftar semua nama contact dan noHP
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan noHP',
    handler(){
        contact.listContact();
    }
});

// Menampilkan detail berdasarkan nama
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.detailContact(argv.nama);
    }
});

// Menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.deleteContact(argv.nama);
    }
});

yargs.parse();





















// const contact = require('./contacts.js');
// const main = async () =>{
//     const nama = await contact.pertanyaan('Masukkan nama anda:');
//     const no = await contact.pertanyaan("Masukkan no hp anda:")
//     const email = await contact.pertanyaan("Masukkan email anda:");
//     contact.simpanContact(nama, no, email);
// };

// main();


// rl.question("Masukkan nama anda: ", nama =>{
//     rl.question("Masukkan Nomer anda: ", no =>{
//         const dataUser = {nama, no};
//         const file = fs.readFileSync('data/contacts.json', 'utf-8');
//         const x = JSON.parse(file);
//         x.push(dataUser);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(x));
//         rl.close();
//     })
// })