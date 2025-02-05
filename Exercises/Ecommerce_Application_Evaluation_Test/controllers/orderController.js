const { Cart, Product, Order, Order_item } = require('../models');
const responseHandler = require('../utilities/responseHandler');
const { cartCreateSchema } = require('../validators/cartValidator')
const yup = require('yup');
// const { SequelizeValidationError, UniqueConstraintError } = require('sequelize')

const createOrder = async (req, res, next) => {
    try {
        console.log(req.user);

        const user_id = parseInt(req.user.id);
        console.log("user_id", user_id);

        const getCart = await Cart.findAll({
            where: {
                user_id: user_id
            },
            include: {
                model: Product,
                require: false,
                as: "product"
            }
        })
        if (getCart === 0) return responseHandler(res, 400, false, "cart not found!")

        console.log(res.json(getCart));
        
        
        

        // const { product_id, quantity } = getCart;
        // const getProduct = await Product.findAll()
    } catch (error) {
        if (error instanceof yup.ValidationError) {

            const formattedErrors = error.inner.map(err => ({
                message: err.message
            }));

            const responseMessage = formattedErrors.map((i) => {
                console.log(i.message);

                return i.message
            })
            return responseHandler(res, 400, false, responseMessage, null, formattedErrors);
        }
        next(error)
    }
}

module.exports = {
    createOrder
}