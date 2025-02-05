const { Cart, Product } = require('../models');
const responseHandler = require('../utilities/responseHandler');
const { cartCreateSchema } = require('../validators/cartValidator')
const yup = require('yup');
// const { SequelizeValidationError, UniqueConstraintError } = require('sequelize')

const createCart = async (req, res, next) => {
    try {
        await cartCreateSchema.validate(req.body, { abortEarly: false });
        const user_id = parseInt(req.user.id)
        console.log(user_id);

        const { product_id, quantity } = req.body
        const productCheck = await Product.findByPk(product_id);
        console.log("productCheck---",productCheck);

        if (productCheck === null) return responseHandler(res, 400, false, "product not exists!");
        console.log(productCheck.stock);
        console.log(quantity);
        if(productCheck.stock === 0)return responseHandler(res, 200, false, "product is unavailable!");
        if(productCheck.stock <= quantity)return responseHandler(res, 200, false, "dmanded quantity of product is more than current stock!");

        const cartBody = { user_id, product_id, quantity }
        const resp = await Cart.create(cartBody);
        if (resp === null) return responseHandler(res, 400, false, "cart not created!")
        return responseHandler(res, 200, true, 'cart created successfully', [resp])
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("formatted--", error.inner);

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

const getcart = async (req, res, next) => {
    try {
        const user_id = parseInt(req.user.id);
        console.log("user_id",user_id);
        
        const resp = await Cart.findAll({
            where: {
                user_id: user_id
            },
            include: {
                model: Product,
                require: false,
                as: "product"
            }
        })
        return responseHandler(res, 200, true, 'cart fetched successfully',resp)
    } catch (error) {
        next(error)
    }
}

const deleteCart = async(req, res, next)=>{
    try {
        const user_id = parseInt(req.user.id);
        const cart_id = parseInt(req.params.id)
        console.log("id---",cart_id);
        
        const resp = await Cart.destroy({where:{
            user_id,
            id: cart_id
        }})
        if(resp===0)return responseHandler(res, 400, false, "cart not exists!");
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