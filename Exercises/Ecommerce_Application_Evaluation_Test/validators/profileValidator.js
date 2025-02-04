const yup = require('yup');

const profileUpdateSchema = yup.object({
    first_name: yup
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters long')
      .max(50, 'First name cannot exceed 50 characters'),

    last_name: yup
      .string()
      .trim()
      .min(2, 'Last name must be at least 2 characters long')
      .max(50, 'Last name cannot exceed 50 characters'),

    email: yup
      .string()
      .trim()
      .email('Invalid email format'),

    password: yup
      .mixed()
      .test('no-password', 'Password cannot be updated', (value) => !value),

    role: yup
      .mixed()
      .test('no-role', 'Role cannot be updated', (value) => !value),
})

module.exports = {
    profileUpdateSchema
}