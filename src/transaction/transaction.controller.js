import express from 'express';
import {borrowItem, getAllTransactions, getTransactionById, getTransactionByUserId, updateTransaction, verifyTransactionStatus, updateReturnedStatus} from './transaction.service.js'

export const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const borrow = await getAllTransactions();
        res.status(200).send(borrow);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const borrow = await getTransactionById(id);
        res.status(200).send(borrow);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/user/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const borrow = await getTransactionByUserId(id)
        res.status(200).send(borrow);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


router.post('/borrow', async (req, res) => {
    const {userId, itemId, quantityBorrowed} = req.body;
    try {
        const borrow = await borrowItem(userId, itemId, quantityBorrowed);
        res.status(201).json({
            data: {
                id: borrow.id,
                userId: borrow.userId,
                itemId: borrow.itemId,
                quantityBorrowed: borrow.quantityBorrowed,
                status: borrow.role
            }
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

router.put('/borrow/:id', async (req, res) => {
    const {id} = req.params;
    const {quantityBorrowed} = req.body;
    try {
        const borrow = await updateTransaction(id,  quantityBorrowed);
        res.status(200).json({
            data: {
                id: borrow.id,
                userId: borrow.userId,
                itemId: borrow.itemId,
                quantityBorrowed: borrow.quantityBorrowed,
                status: borrow.role
            },
            messages: "Update transaction successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

router.patch("/verify/:transactionId", async (req, res) => {

    try {

        const { transactionId } = req.params;

        const { status } = req.body;

        await verifyTransactionStatus(transactionId, status);

        res.status(200).json({message: "Transaction verified successfully."});

    } catch (error) {

        res.status(400).send(error.message);

    }
});

router.patch('/return/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const { userId, status } = req.body;

        const transaction = await getTransactionById(id);

        if (transaction.userId !== userId) {

            return res.status(403).json({message: "Unauthorized"});
        }

        await updateReturnedStatus(id, status);

        res.status(200).json({ message: "Item returned" });
    } catch (error) {

        res.status(400).send(error.message);

    }
})