const users = require('./users')
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const addUserHandler = async (request, h) => {
    const { name, email, password } = request.payload;

    
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return h.response({
            error: true,
            message: 'Email already exists'
        }).code(400);
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);
    

   
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };
    users.push(newUser);

    return h.response({
        error: false,
        message: 'User Created'
    }).code(201);
};

const userlogin =async (request,h)=>{
    
    const { email, password } = request.payload;

    const user = users.find(user => user.email === email);
    if (!user) {
        return h.response({
            error: true,
            message: 'Invalid email or password'
        }).code(400);
    }

    if (typeof user.password !== 'string') {
        user.password = user.password.toString(); 
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return h.response({
            error: true,
            message: 'Invalid email or password'
        }).code(400);
    }

    const token = Jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '1h' });

    return h.response({
        error: false,
        message: 'success',
        loginResult: {
            userId: user.id,
            name: user.name,
            token
        }
    }).code(200);
};
 
module.exports = { addUserHandler, userlogin };