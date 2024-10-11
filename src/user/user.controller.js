import express from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUserByid} from "./user.service.js";


export const router = express.Router();


router.get("/", async (req, res) => {
    try{
        const user = await getAllUsers();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await getUserById(id);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.post("/", async (req, res) => {
    const {username, email, password, role} = req.body;
    try {
        const newUser = await createUser(username, email, password, role);
        res.status(201).json({
            data: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
        });
    } catch (err) {
        res.status(400). json({
            error: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {username, email, password, role} = req.body;
    try {
        const user = await updateUser(id, username, email, password, role);
        res.status(200).json({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            message: "Updated Successfully"
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const user = await deleteUserByid(id);
        res.status(200).json({
            data: {
                id: user.id
            },
            messages: "Successfully delete user"
        })
    } catch (err) {
        res.status(400). json({
            error: err.message
        })
    }
})
