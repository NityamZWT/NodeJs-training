const yup = require('yup');

const idSchema = yup.object({
    id: yup.number()
        .integer("ID must be an integer")  
        .required("ID is required"),       
}).strict();  

module.exports ={
    idSchema
}