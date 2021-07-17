/* Script for turning csv files into JSON that can we then can import to our DB trough seeder.js */
const csvToJson = require('convert-csv-to-json');

let fileInputName = 'seed_data/eko_csv.csv'; 
let fileOutputName = 'seed_data/ekonomi_data.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
