const userModel = require('../services/userModel');

const uploadImage = (req, res) => {
    try{
        console.log("enter in controller");
        console.log('req.body', req.body);
        
        const files = req.file;
        console.log('files',files);
        const file = userModel.uploadImageModel(req.params.id, files);
        console.log('file',file.path);
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