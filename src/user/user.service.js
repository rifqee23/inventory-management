import {insertUser, findUser, findUserById, editUser, deleteUser} from "./user.repository.js";
import bcrypt from "bcrypt";

async function createUser(username, email, password, role) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            email,
            password: hashedPassword,
            role
        };
        return await insertUser(newUser);
    } catch (err) {
        throw Error('Failed to create user');
    }
}

async function getAllUsers() {
    return findUser();
}

async function getUserById(id) {
    const user = await findUserById(id);
    if (!user) {
        throw Error('User not found');
    }
    return user;
}

async function updateUser(id, username, email, password, role) {
    try {
        await getUserById(id);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword ,
            role
        }
        return await editUser(id, user);
    } catch (err) {
        throw Error('Failed to update user');
    }
}

async function deleteUserByid (id) {
    try {
        await getUserById(id);
        return await deleteUser(id);
    } catch (err) {
        throw Error('Failed to delete user');
    }
}


export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserByid
}