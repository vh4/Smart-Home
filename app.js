const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const chalk = require('chalk');
const routing = require('./routes/web')
const expresLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const exp = require('constants');
const ApiRouters = require('./routes/api')
const passport = require('passport')
const session  = require('express-session')
const mongostore = require('connect-mongo')(session)
const mongoose = require('mongoose')
require('./app/middleware/passport')(passport)
const url = 'mongodb+srv://tony:xxxxx@cluster0.xmhqk.mongodb.net/IoT?retryWrites=true&w=majority'

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store : new mongostore({
        mongooseConnection: mongoose.connection
    })
}))


app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(url,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:false,
    }).then(()=>{
        console.log('database terhubung')
    })

mongoose.connection.on('error', ()=>{
    console.log(chalk.bold.red('database tidak terhubung'))
})

app.use(morgan('dev'))
app.use(expresLayout)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/resources/views/'))
app.use(express.static(__dirname + '/public/'))

//passport initialize for google and facebook login


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8000, ()=>{
    console.log(chalk.bold.rgb(444, 22, 214)('server listening in port 80'))
})

app.use(routing)
app.use(ApiRouters)
