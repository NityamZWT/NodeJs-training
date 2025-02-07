const yup = require('yup');

const idSchema = yup.object({
    id: yup.number()  
        .required("ID is required")
        .typeError("id must be in integer"),       
});  

module.exports ={
    idSchema
}