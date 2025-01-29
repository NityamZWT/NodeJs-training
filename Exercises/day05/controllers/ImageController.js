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
            return res.status(404).json({massage:"user not found "})
        }
        response.message = "image added successfully!!";
        res.status(200).json(response)
    }catch(error){
        return res.status(500).json({ message: error['message'] || 'server error!' });
    }
}

const deleteImage = async(req, res)=>{
    try {
        const deleteImage = await userModel.deleteImage(req.params.userId);
        if (!deleteImage) {
            return res.status(404).json({ message: "User image not found!" });
        }
        response.message = "User image deleted successfully!"
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error['message'] || 'server error!' });
    }
}

module.exports = {
    uploadImage,
    deleteImage
}