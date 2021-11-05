const express = require('express')
const cartController = require('./../controllers/cartController')

const router = express.Router()

router.route('/')
.get(cartController.getCart)
.post(cartController.createCart)

module.exports = router