const models = require('../../user/models/user-models');

const { registerSchema } = require('../validation.js/auth-validation')


async function register  (req, res) { 
    await registerSchema.validateAsync(req.body, { abortEarly: false})

    const { email, name, password } = req.body
    
    const found = await models.exists({ email })

    if(found) { 
        throw new Error('Invalid email')
    }

    const user = await models.create({
        email, name, password
    })

}


module.exports = { register }