const yup = require('yup');

const categorySchema = yup.object({
    name: yup.string()
    .strict() 
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Category name must contain only letters!") 
    .required("Category name is required!")
    .transform(value => (value ? value.toLowerCase() : value)),
})

module.exports = {
    categorySchema
}