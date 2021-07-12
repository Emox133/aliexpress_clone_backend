exports.getAllProducts = () => {
    const products = [
        {
            id: 1,
            name: 'earings',
            price: '22.13$'
        },
        {
            id: 2,
            name: 'earings',
            price: '22.13$'
        },
        {
            id: 3,
            name: 'earings',
            price: '22.13$'
        },
        {
            id: 4,
            name: 'earings',
            price: '22.13$'
        },
    ]

    res.status(200).json({
        products
    })
}