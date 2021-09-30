import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Wanda Maximoff',
        email: 'wanda@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Tony Stark',
        email: 'tony@example.com',
        password: bcrypt.hashSync('123456', 10),
    },

]

export default users;