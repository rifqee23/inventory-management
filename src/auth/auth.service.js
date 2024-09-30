import bcrypt from 'bcrypt';
import userRepository from './auth.repository.js';

async function register(username, email, password) {
    try {
        const hashedPassword  = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            role: "SUPPLYER",
        };
        return await userRepository.createUser(user);
    }catch (error) {
        throw new Error('Failed to register user');
    }
}

async function login(username, password) {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');
    }
    return user;
}

export default {
    register,
    login
};