import express from "express";
import authService from "./auth.service.js";

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const newUser = await authService.register(username, email, password);
        res.status(201).json({
            data: {
                username: newUser.username,
                email: newUser.email
            },
            message: "Registration Success!"
        })
    } catch (error) {
        res.status(400). json(
            {
                error: error.message
            }
        )
    }
});

router.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const {user, token} = await authService.login(username, password);
        res.status(200).json({
            data: {
                username: user.username,
                role : user.role,
                token
            },
            message: "Login Success!"
        });
    } catch (error) {
        res.status(400). json(
            {
                error: error.message
            }
        )
    }
})

export default router;
