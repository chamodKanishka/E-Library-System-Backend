//Validation
const Joi = require('@hapi/joi')


const studentRegistrationValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).required(),
            nsbm_Id: Joi.number().required(),
            faculty: Joi.number().required(),
            email: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        }
    )

    return schema.validate(data)
}



const studentLoginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        }
    )

    return schema.validate(data)
}


module.exports.studentRegistrationValidation = studentRegistrationValidation
module.exports.studentLoginValidation = studentLoginValidation