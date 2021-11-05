const express = require("express");
const cors = require('cors')
const productsRouter = require('./routers/productRouter')
const paymentRouter = require('./routers/paymentRouter')
const cartRouter = require('./routers/cartRouter')

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/cart', cartRouter)

module.exports = app