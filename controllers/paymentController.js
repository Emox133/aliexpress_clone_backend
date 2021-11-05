const catchAsync = require('./../utils/catchAsync')
const Product = require('./../models/Product')
const Cart = require('./../models/Cart')

exports.paypalBridge = catchAsync(async(req, res, next) => {
    const ids = [
        '61010f1ba3bf831e204e04e1',
        '61010f2da3bf831e204e04e3',
        '61010f3aa3bf831e204e04e5'
    ]

    const selectedProducts = await Product.find({'_id': {$in: ids}}).select('-__v -_id')
    let totalAmount
    if(selectedProducts) {
        totalAmount = selectedProducts.map(sp => sp.price * sp.quantity).reduce((acc, cur) => {acc + cur}, [0])
    }
    req.paypalData = {selectedProducts, totalAmount}

    next()
})

// FOR TESTING // OR NOT ?
exports.ordersBridge = catchAsync(async(req, res, next) => {
    // change later to req.user_id is cartOwner
    const cartIds = await Cart.find({cartOwner: '61010f1ba3bf831e204e04e1'})
    const ids = cartIds.map(cid => cid.products.map(p => p._id)).flat(Infinity)

    const selectedProducts = await Product.find({'_id': {$in: ids}}).select('-__v -_id')
    const totalAmount = selectedProducts.map(sp => sp.unit_amount.value * sp.quantity).reduce((acc, cur) => acc + cur)

    console.log(selectedProducts)
    res.status(200).json({
       data: {
           selectedProducts,
           totalAmount
       }
    })
})

exports.paypal = catchAsync(async(req, res) => {
    const {selectedProducts, totalAmount} = req.paypalData

    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:8000/api/v1/payment/paypal/success",
            cancel_url: "http://localhost:8000/api/v1/payment/paypal/cancel"
        },
        transactions: [
            {
                item_list: {
                    items: selectedProducts,
                    shipping_address: {
                        recipient_name: "Betsy Buyer",
                        line1: "111 First Street",
                        city: 'Saratoga',
                        country_code: 'US',
                        postal_code: '95070'
                    }
                },
                amount: {
                    currency: "USD",
                    total: totalAmount
                },
                description: "This is the payment description."
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            // console.log(payment);
            res.redirect(payment.links[1].href)
        }
    });
});

exports.successRoute = catchAsync(async(req, res) => {
    const {totalAmount} = req.paypalData

    // res.send("Success");
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: totalAmount
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // console.log("Get Payment Response");
            // console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
});

exports.cancelRoute = catchAsync(async(req, res) => {
    res.render("cancel");
});