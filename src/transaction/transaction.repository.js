import prisma from "../db.js";

async function findTransaction() {
  return prisma.transaction.findMany({
    include: {
      Item: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function findTransactionById(id) {
  return prisma.transaction.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Item: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function findTransactionByUserId(userId) {
  return prisma.transaction.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      Item: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function createTransaction(transactionData) {
  return prisma.transaction.create({
    data: transactionData,
  });
}

async function editTransaction(id, transactionData) {
  return prisma.transaction.update({
    where: {
      id: parseInt(id),
    },
    data: transactionData,
  });
}

async function updateStatus(id, data) {
  return prisma.transaction.update({
    where: {
      id: parseInt(id),
    },
    data: data,
  });
}

export {
  createTransaction,
  editTransaction,
  findTransaction,
  findTransactionById,
  findTransactionByUserId,
  updateStatus,
};
