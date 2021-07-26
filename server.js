const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({
    path: `${__dirname}/config.env`
})

const PORT = process.env.PORT || 5000
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB connection successful!'));

const server = app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})