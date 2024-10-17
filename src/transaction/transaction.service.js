import {
  createTransaction,
  editTransaction,
  findTransaction,
  findTransactionById,
  findTransactionByUserId,
  updateStatus,
} from "./transaction.repository.js";
import { getItemById, editItemById } from "../item/item.service.js";
async function getAllTransactions() {
  return findTransaction();
}

async function getTransactionById(id) {
  const transaction = await findTransactionById(id);
  if (!transaction) {
    throw Error("Transaction not found");
  }
  return transaction;
}

async function getTransactionByUserId(userId) {
  const transaction = await findTransactionByUserId(userId);
  if (!transaction || transaction.length === 0) {
    throw Error("Transaction not found");
  }
  return transaction;
}

async function borrowItem(userId, itemId, quantityBorrowed) {
  try {
    const transaction = {
      userId,
      itemId,
      quantityBorrowed,
      status: "PENDING",
    };
    return await createTransaction(transaction);
  } catch (err) {
    throw Error("Failed to borrow transaction");
  }
}

async function updateTransaction(id, quantityBorrowed) {
  try {
    await getTransactionById(id);
    const transaction = {
      quantityBorrowed,
    };
    return await editTransaction(id, transaction);
  } catch (err) {
    throw Error("Failed to update transaction");
  }
}

async function verifyTransactionStatus(transactionId, status, timestampField) {
  try {
    if (status === "RETURNED") {
      throw new Error('Changing status to "RETURNED" is not allowed');
    }
    const updateData = {
      status,
      ...(timestampField && { [timestampField]: new Date() }),
    };

    const transaction = await findTransactionById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }
    await updateStatus(transactionId, updateData);

    if (status === "BORROWED") {
      const item = await getItemById(transaction.itemId);
      if (!item) {
        throw new Error("Item not found");
      }

      const newQuantity = item.quantity - transaction.quantityBorrowed;
      if (newQuantity < 0) {
        throw new Error("Insufficient quantity.");
      }
      await editItemById(item.id, undefined, undefined, newQuantity);
    }
  } catch (err) {
    throw Error(err.message);
  }
}

async function updateReturnedStatus(transactionId, status, timestampField) {
  try {
    const updateData = {
      status,
      ...(timestampField && { [timestampField]: new Date() }),
    };

    const transaction = await findTransactionById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // if (status !== "BORROWED") {
    //
    //     throw new Error("Cannot return item. Transaction status is not BORROWED");
    //
    // }

    // Update Status pada Transaksi menjadi "RETURNED"
    await updateStatus(transactionId, updateData);
    const item = await getItemById(transaction.itemId);
    const newQuantity = item.quantity + transaction.quantityBorrowed;
    await editItemById(item.id, undefined, undefined, newQuantity);
  } catch (err) {
    throw Error(err.message);
  }
}

export {
  borrowItem,
  getAllTransactions,
  updateTransaction,
  getTransactionById,
  getTransactionByUserId,
  verifyTransactionStatus,
  updateReturnedStatus,
};
