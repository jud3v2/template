// validator for create user request
// function will receive only entire request object and response object

const Joi = require('joi');


module.exports.createUserValidator = (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
            email: Joi.string().email().required(),
            name: Joi.string(),
            password: Joi.string().required(),
        });

        const {error, value} = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error });
        }

        req.body = value;

        return {
            error: null,
            data: req.body
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}