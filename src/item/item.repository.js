import prisma from "../db.js";

async function findItems() {
    return prisma.item.findMany();
}

async function findItemById(id) {
    return prisma.item.findUnique({
        where: {
            id: parseInt(id)
        },
    });
}

async function insertItem(itemData) {
    return prisma.item.create({
        data: itemData
    });
}

async function editItem(id, itemData) {
    return prisma.item.update({
        where: {
            id: parseInt(id)
        },
        data: itemData

    });
}

async function deleteItem(id) {
    return prisma.item.delete({
        where: {
            id: parseInt(id)
        }
    });
}

export  {
    findItems,
    findItemById,
    insertItem,
    editItem,
    deleteItem
}