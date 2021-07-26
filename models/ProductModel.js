const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    image: {
        type: String,
        // default: add later
    },
    name: {
        type: String,
        required: [true, 'Molimo vas unesite ime proizvoda']
    },
    quantity: {
        type: Number,
        required: [true, 'Molimo vas unesite količinu proizvoda']
    },
    category: {
        type: String,
        required: [true, 'Molimo vas unesite kategoriju proizvoda']
    }
})

const Product = mongoose.model('Product', productsSchema)

module.exports = Product