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
        contact.simpanContact(argv.nama, argv.noHP, argv.email);
    }
}).demandCommand();

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