import prisma from "../db.js";

async function createUser(userData) {

    try {
        return await prisma.user.create({data: userData});

    } catch (error) {
        throw new Error('Failed to create user in repository');
    }

}

async function findUserByUsername(username) {
    return prisma.user.findUnique({where: {username}})
}

export default {
    createUser,
    findUserByUsername
};