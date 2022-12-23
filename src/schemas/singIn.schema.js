import joi from "joi";

const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default singInSchema;