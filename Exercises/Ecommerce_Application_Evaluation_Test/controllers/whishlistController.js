const { Product, Whishlist } = require('../models');
const responseHandler = require('../utilities/responseHandler');
const { whishlistCreateSchema } = require('../validators/whishlistValidator')
const yup = require('yup');

const createWhishlist = async(req, res, next)=>{
    try {
        await whishlistCreateSchema.validate(req.body, { abortEarly: false });

        const user_id = parseInt(req.user.id)
        console.log(user_id);
        const { product_id } = req.body;

        const productheck = await Product.findByPk(product_id);
        if (productheck === null) return responseHandler(res, 400, false, "product not exists!");

        const whishlistBody = { user_id, product_id }
        const resp = await Whishlist.create(whishlistBody);

        if (resp === null) return responseHandler(res, 400, false, "whishlist not created!")

        return responseHandler(res, 200, true, 'cart created successfully', [resp])
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

const getWhishlist = async(req, res, next)=>{
    try {
        const user_id = parseInt(req.user.id);
        console.log("user_id",user_id);
        
        const resp = await Whishlist.findAll({
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

const deleteWhishlist = async(req, res, next)=>{
    try {
        const user_id = parseInt(req.user.id);
        const whishlist_id = parseInt(req.params.id)
        
        const resp = await Whishlist.destroy({where:{
            user_id,
            id: whishlist_id
        }})
        if(resp===0)return responseHandler(res, 400, false, "whishlist not exists!");

        return responseHandler(res, 200, true, 'whishlist deleted successfully');
    } catch (error) {
        next(error)
    }
}

module.exports={
    createWhishlist,
    getWhishlist,
    deleteWhishlist
}