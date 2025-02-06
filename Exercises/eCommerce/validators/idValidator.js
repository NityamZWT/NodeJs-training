const yup = require('yup');

const idSchema = yup.object({
    id: yup.number()  
        .required("ID is required"),       
});  

module.exports ={
    idSchema
}