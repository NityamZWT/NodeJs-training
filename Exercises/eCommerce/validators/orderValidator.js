const yup = require('yup');

const orderStatusSchema = yup.object({
    status: yup.string()
    .oneOf(['pending','shipped', 'delivered', 'canceled'],"this is not valid option! valid option- (pending, shipped, delivered, canceled)")
    .strict() 
    .trim()
    .required("status is required!"),
}).strict("only accepting status!")

module.exports = {
    orderStatusSchema
}