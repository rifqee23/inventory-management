import {deleteItem, editItem, findItemById, findItems, insertItem} from './item.repository.js';

async function getAllItems() {
    return findItems();
}

async function getItemById(id) {
    const item = await findItemById(id);
    if (!item) {
        throw Error('Item not found');
    }
    return item;
}

async function createItem(name, description, quantity) {
    try{
        const newItem = {
            name,
            description,
            quantity,
        }

        return await insertItem(newItem);
    } catch (err) {
        throw Error('Failed to register item');
    }
}

async function editItemById(id, name, description, quantity) {
    try{
        await getItemById(id);
        const item = {
            name,
            description,
            quantity,
        }
        return await editItem(id, item);
    } catch (err) {
        throw Error(err.message);
    }
}

async function deleteItemById(id) {
    try {
        await  getItemById(id)
        return await deleteItem(id);
    } catch (err) {
        throw Error('Failed to delete item');
    }
}

export  {
    getAllItems,
    getItemById,
    createItem,
    editItemById,
    deleteItemById
}