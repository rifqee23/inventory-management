import express from "express";
import { authorizeJWT } from "../middleware/authorizeJWT.js";
import { authorizeAdmin } from "../middleware/adminAuthorization.js";
import {
  borrowItem,
  getAllTransactions,
  getTransactionById,
  getTransactionByUserId,
  updateTransaction,
  verifyTransactionStatus,
  updateReturnedStatus,
} from "./transaction.service.js";

export const router = express.Router();

router.get("/", authorizeAdmin, async (req, res) => {
  try {
    const borrow = await getAllTransactions();
    res.status(200).send(borrow);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/user", authorizeJWT, async (req, res) => {
  const userId = req.userId;
  try {
    const transaction = await getTransactionByUserId(userId);
    res.status(200).send(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const borrow = await getTransactionById(id);
    res.status(200).send(borrow);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/borrow", authorizeJWT, async (req, res) => {
  const userId = req.userId;
  const { itemId, quantityBorrowed } = req.body;
  try {
    const borrow = await borrowItem(userId, itemId, quantityBorrowed);
    res.status(201).json({
      data: {
        id: borrow.id,
        userId: borrow.userId,
        itemId: borrow.itemId,
        quantityBorrowed: borrow.quantityBorrowed,
        status: borrow.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

router.put("/borrow/:id", async (req, res) => {
  const { id } = req.params;
  const { quantityBorrowed } = req.body;
  try {
    const borrow = await updateTransaction(id, quantityBorrowed);
    res.status(200).json({
      data: {
        id: borrow.id,
        userId: borrow.userId,
        itemId: borrow.itemId,
        quantityBorrowed: borrow.quantityBorrowed,
        status: borrow.role,
      },
      messages: "Update transaction successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

router.patch("/verify/:transactionId", authorizeAdmin, async (req, res) => {
  try {
    const { transactionId } = req.params;

    const { status } = req.body;

    await verifyTransactionStatus(transactionId, status);

    res.status(200).json({ message: "Transaction verified successfully." });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/return/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { status } = req.body;

    const transaction = await getTransactionById(id);

    if (transaction.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await updateReturnedStatus(id, status);

    res.status(200).json({ message: "Item returned" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
