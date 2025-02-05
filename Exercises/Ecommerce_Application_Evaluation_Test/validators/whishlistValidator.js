const yup = require('yup');

const whishlistCreateSchema = yup.object().shape({

    product_id: yup
        .number()
        .integer("Product ID must be an integer.")
        .required("Product ID is required.")
        .positive("Product ID must be a positive number."),
});

module.exports = {whishlistCreateSchema};
