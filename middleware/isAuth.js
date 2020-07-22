const jwt = require('jsonwebtoken')

module.exports = function (req , res , next){
    const token = req.header('authorization')
    console.log(token)

    if(!token){
        res.status(401).send({ error: 'unauthorized' })
    }

    try{
        const verified = jwt.verify(token , process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(401).send({ error: 'unauthorized' })
    }
}