import bcrypt from 'bcrypt';

import {createUser, findUserByUsername} from './auth.repository.js';

import jwt from 'jsonwebtoken';

async function register(username, email, password) {
    try {
        const hashedPassword  = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            role: "USER",
        };
        return await createUser(user);
    }catch (error) {
        throw new Error('Failed to register user');
    }
}

async function login(username, password) {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');
    }
    const token = generateToken(user);
    return {user, token };
}

function generateToken(user) {
    return jwt.sign({
        userId: user.id, username: user.username, email: user.email, role: user.role
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });
}

function generateToken(user) {
    return jwt.sign({
        userId: user.id, username: user.username, email: user.email, role: user.role
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });
}

export  {
    register,
    login
};