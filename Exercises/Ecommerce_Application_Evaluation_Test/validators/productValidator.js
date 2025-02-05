const yup = require('yup');


const productCreateSchema = yup.object({
    name: yup
        .string()
        .trim()
        .max(255, "Product name must not exceed 255 characters")
        .required("Product name is required!"),

    description: yup
        .string()
        .nullable()
        .max(5000, "Description must not exceed 5000 characters"),

    price: yup
        .number("price must be number")
        .positive("Price must be greater than 0")
        .required("Price is required!"),

    category_id: yup
        .number()
        .integer("Category ID must be an integer")
        .positive("Category ID must be a positive number")
        .required("Category ID is required!"),

    image_url: yup
        .string()
        .nullable()
        .url("Image URL must be a valid URL"),

})

const productUpdateSchema = yup.object({
    name: yup
    .string()
    .trim()
    .max(255, "Product name must not exceed 255 characters"),

description: yup
    .string()
    .nullable()
    .max(5000, "Description must not exceed 5000 characters"),

price: yup
    .number("price must be number")
    .positive("Price must be greater than 0"),

category_id: yup
    .number()
    .integer("Category ID must be an integer")
    .positive("Category ID must be a positive number"),

image_url: yup
    .string()
    .nullable()
    .url("Image URL must be a valid URL"),

})
module.exports = {
    productCreateSchema,
    productUpdateSchema
}