const yup = require('yup');

const userQuerySchema = yup.object({
  role: yup.string().oneOf(['admin', 'user', 'moderator']).optional(),
  orderby: yup.string().oneOf(['createdAt', 'updatedAt', 'price', 'stock']).optional(),
  ordertype: yup.string().oneOf(['ASC', 'DESC']).optional(),
});

module.exports = userQuerySchema;
