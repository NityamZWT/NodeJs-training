const { Product, Whishlist } = require('../models');
const {responseHandler, handleYupError} = require('../utilities/customHandler')
const { wishlistCreateSchema } = require('../validators/wishlistValidator')
const yup = require('yup');

//handling creation of wishlist 
const createwishlist = async(req, res, next)=>{
    try {
        await wishlistCreateSchema.validate(req.body, { abortEarly: false });

        const user_id = parseInt(req.user.id)
        console.log(user_id);
        const { product_id } = req.body;

        //check product exist or not
        const productheck = await Product.findByPk(product_id);
        if (productheck === null) return responseHandler(res, 400, false, "product not exists!");

        const wishlistBody = { user_id, product_id }
        const newWishlistData = await Whishlist.create(wishlistBody);

        if (newWishlistData === null) return responseHandler(res, 400, false, "wishlist not created!")

        return responseHandler(res, 200, true, 'cart created successfully', [newWishlistData])
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

//handling getting of wishlist 
const getwishlist = async(req, res, next)=>{
    try {
        const user_id = parseInt(req.user.id);
        console.log("user_id",user_id);
        
        const wishlistData = await Whishlist.findAll({
            where: {
                user_id: user_id
            },
            include: {
                model: Product,
                require: false,
                as: "product"
            }
        })
        return responseHandler(res, 200, true, 'cart fetched successfully',wishlistData)
    } catch (error) {
        next(error)
    }
}

//handling deletion of wishlist 
const deletewishlist = async(req, res, next)=>{
    try {
        const user_id = parseInt(req.user.id);
        const wishlist_id = parseInt(req.params.id)
        
        const resp = await Whishlist.destroy({where:{
            user_id,
            id: wishlist_id
        }})
        if(resp===0)return responseHandler(res, 400, false, "wishlist not exists!");

        return responseHandler(res, 200, true, 'wishlist deleted successfully');
    } catch (error) {
        next(error)
    }
}

module.exports={
    createwishlist,
    getwishlist,
    deletewishlist
}