const express = require("express");
const cors = require('cors')
const userRouter = require('./routers/userRouter')

const app = express();
app.use(cors())

app.use(express.json())

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

app.get("/paypal", (req, res) => {
    const create_payment_json = [
        {
            reference_id: "PUHF",
            description: "Some description",

            custom_id: "Something7364",
            soft_descriptor: "Great description 1",
            amount: {
                currency_code: "EUR",
                value: "100.00",
                breakdown: {
                    item_total: {
                        currency_code: "EUR",
                        value: "100.00"
                    }
                }
            },
            items: [
                {
                    name: "Item 1",
                    description: "The best item ever",
                    sku: "xyz-2654",
                    unit_amount: {
                        currency_code: "EUR",
                        value: "20.00"
                    },
                    quantity: "1"
                },
                {
                    name: "Item 2",
                    description: "Not bad too",
                    sku: "zdc-3942",
                    unit_amount: {
                        currency_code: "EUR",
                        value: "40.00"
                    },
                    quantity: "2"
                }
            ],
            payee: {
                email_address: 'sb-so5vc820220@business.example.com',
                merchant_id: '9SMNATQ9NFPNG'
            },
            payer: {
                email_address: 'sb-3celh653951@personal.example.com',
                payer_id: '3FSXDRN8Z57HG',
                name: {
                    given_name: 'Emir',
                    surname: 'Salihović'
                }
            },
            shipping: {
                shipping_detail: {
                    name: {
                        full_name: 'ZH ZOLA'
                    },
                    address: {
                        address_line_1: 'Živinice ul. 25. novembar blok 3'
                    },
                    postal_code: '75270'
                }
            }
        }
    ]

    res.status(200).json({
        status: 'success',
        create_payment_json
    })
});


app.get("/success", (req, res) => {
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: "1.00"
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            // res.render("success");
        }
    });
});

app.get("cancel", (req, res) => {
    res.render("cancel");
});

app.use('/api/v1/users', userRouter)

module.exports = app