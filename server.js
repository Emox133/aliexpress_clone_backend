const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({
    path: `${__dirname}/config.env`
})

const DB = process.env.DB.replace('<PASWORD>', process.env.DB_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    console.log('DB connection successful...')
})

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})