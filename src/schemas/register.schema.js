import joi from "joi";

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword: joi.ref('password')
});

export default registerSchema;