const express = require('express')
const paymentController = require('./../controllers/paymentController')

const router = express.Router()

router.route('/paypal')
.get(paymentController.paypalBridge, paymentController.paypal)

router.route('/paypal/orders')
.get(paymentController.ordersBridge)

router.route('/paypal/success')
.get(paymentController.paypalBridge, paymentController.successRoute)

router.route('/paypal/cancel')
.get(paymentController.cancelRoute)

module.exports = router