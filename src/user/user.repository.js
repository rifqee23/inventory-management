import prisma from "../db.js";

async function insertUser(userData) {
    return prisma.user.create({
        data: userData
    });
}

async function findUser() {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            created_at: true,
        }
    });
}

async function findUserById(userId) {
    return prisma.user.findUnique({
        where: {id: parseInt(userId)},
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            created_at: true,
        }
    });
}

async function editUser(id, userData) {
    return prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: userData
    })
}

async function deleteUser(id) {
    return prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
}

export {
    insertUser,
    findUser,
    findUserById,
    editUser,
    deleteUser
}