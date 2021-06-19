const fs = require('fs')

if(!fs.existsSync('./json')){
    fs.mkdirSync('./json')
}

if(!fs.existsSync('./json/contacts.json')){
    fs.writeFileSync('./json/contacts.json', '[]', 'utf-8')
}

