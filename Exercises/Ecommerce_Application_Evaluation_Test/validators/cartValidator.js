const yup = require('yup');

const cartCreateSchema = yup.object({
    // user_id: yup
    //     .number()
    //     .positive("User ID must be a positive number")
    //     .integer("User ID must be an integer")
    //     .required("User ID is required"),

    product_id: yup
        .number()
        .positive("Product ID must be a positive number")
        .integer("Product ID must be an integer")
        .required("Product ID is required"),

    quantity: yup
        .number()
        .min(1, "Quantity must be at least 1")
        .default(1) // Default to 1 if no quantity is provided
        .required("Quantity is required")
});

module.exports = {cartCreateSchema};
