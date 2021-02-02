import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.jwtsecret, {
        expiresIn: '30d'
    })
}

export default generateToken