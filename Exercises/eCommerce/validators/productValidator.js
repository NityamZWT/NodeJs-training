const yup = require('yup');


const productCreateSchema = yup.object({
    name: yup
        .string()
        .trim()
        .max(255, "Product name must not exceed 255 characters")
        .required("Product name is required!")
        .transform(value => (value ? value.toLowerCase() : value)),

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
    .max(255, "Product name must not exceed 255 characters")
    .transform(value => (value ? value.toLowerCase() : value)),

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

})

const productQuerySchema = yup.object({
  orderby: yup.string().oneOf(['createdAt', 'updatedAt', 'price', 'stock']).optional(),
  ordertype: yup.string().oneOf(['ASC', 'DESC']).optional(),
  maxprice: yup.number().positive().optional().typeError("max price must be in positive number"),
  minprice: yup.number().positive().optional().typeError("min price must be in positive number"),
  categoryname: yup.string().trim().optional().transform(value => (value ? value.toLowerCase() : value)),
  productname: yup.string().trim().optional().transform(value => (value ? value.toLowerCase() : value)),
});


module.exports = {
    productCreateSchema,
    productUpdateSchema,
    productQuerySchema
}