const { Category } = require('../models');
const responseHandler = require('../utilities/responseHandler')


const createCategory = async(req, res, next)=>{
try {
    const categoryName = req.body.name
    const checkName = await Category.findOne({where:{name:categoryName}});
    
    if(checkName !== null){
        return  responseHandler(res, 400, false,"category is already created!");
    }

    const resp = await Category.create({name: categoryName});

    return responseHandler(res, 201, true, `category ${resp.name} is created with ${resp.id}`);

} catch (error) {
    next(error);
}
}


module.exports={
    createCategory
}