import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return  jwt.sign({id}, process.env.USER_SECRET, {
                expiresIn: '14d'
            })
}

export default generateToken;