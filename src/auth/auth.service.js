import bcrypt from 'bcrypt';
import userRepository from './auth.repository.js';

async function register(username, email, password) {
    try {
        const hashedPassword  = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            role: "USER",
        };
        return await userRepository.createUser(user);
    }catch (error) {
        throw new Error('Failed to register user');
    }
}

export default { register };