const userModel = require('../services/userModel');

const response ={}

const uploadImage = async(req, res) => {
    try{
        console.log("enter in controller");
        console.log('req.body', req.body);
        
        const files = req.file;
        console.log('files',files);
        const file = await userModel.uploadImageModel(req.params.id, files);
        
        if(!req.params.id){
            return res.status(404).json({massage:"user not found with" + req.params.id})
        }
        response.message = "image added successfully!!";
        res.status(200).json(response)
    }catch(error){
        console.log('server error!:',error);
        response.message= error.message;
        return res.status(500).json(response.message)
    }
}

module.exports = {uploadImage}