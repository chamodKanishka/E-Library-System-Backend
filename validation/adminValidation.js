//Validation
const Joi = require('@hapi/joi')


const adminlogin_Validation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        }
    )

    return schema.validate(data)
}


const adminAddBookValidation = (data) => {
    const schema = Joi.object(
        {
            title: Joi.string().required(),
            ISBN:Joi.string().min(4).required(),
            author:Joi.string().required(),
            description:Joi.string().required(),
            category:Joi.number().required(),
            added_by_email:Joi.string().required().email(),
            no_copies: Joi.number().required()
        }
    )

    return schema.validate(data)
}

module.exports.adminlogin_Validation = adminlogin_Validation
module.exports.adminAddBookValidation = adminAddBookValidation