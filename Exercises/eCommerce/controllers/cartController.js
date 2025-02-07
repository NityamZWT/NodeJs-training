const { Cart, Product } = require('../models');
const {responseHandler, handleYupError} = require('../utilities/customHandler')
const { cartCreateSchema } = require('../validators/cartValidator')
const yup = require('yup');

// handling new cart creation
const createCart = async (req, res, next) => {
    try {
        await cartCreateSchema.validate(req.body, { abortEarly: false });
        const user_id = parseInt(req.user.id)
        console.log(user_id);

        const { product_id, quantity } = req.body
        //check that product already exists or not
        const productCheck = await Product.findByPk(product_id);
        if (productCheck === null) return responseHandler(res, 400, false, "product not exists!");

        //check that stock is 0 or not
        if (productCheck.stock === 0) return responseHandler(res, 400, false, "product is unavailable!");

        //check that quantity is not greater than stock
        if (productCheck.stock <= quantity) return responseHandler(res, 400, false, "dmanded quantity of product is more than current stock!");

        const cartBody = { user_id, product_id, quantity }
        const newCartData = await Cart.create(cartBody);

        if (newCartData === null) return responseHandler(res, 400, false, "cart not created!")

        return responseHandler(res, 201, true, 'cart created successfully', [newCartData])
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

//handling cart data access by user
const getcart = async (req, res, next) => {
    try {
        //user id getting from jwt token after authentication
        const user_id = parseInt(req.user.id);
        //get cart data of user
        const cartData = await Cart.findAll({
            where: {
                user_id: user_id
            },
            include: {
                model: Product,
                require: false,
                as: "product"
            }
        })
        if(cartData === null)return responseHandler(res, 404, false, 'cart not found!')
        return responseHandler(res, 200, true, 'cart fetched successfully', cartData)
    } catch (error) {
        next(error)
    }
}

//handling deletion of cart 
const deleteCart = async (req, res, next) => {
    try {
        const cart_id = parseInt(req.params.id)

        const resp = await Cart.destroy({
            where: {
                id: cart_id
            }
        })
        if (resp === 0) return responseHandler(res, 404, false, "cart not exists!");
        return responseHandler(res, 200, true, 'cart deleted successfully')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCart,
    getcart,
    deleteCart
}