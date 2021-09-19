import express from "express";
import { userController } from "../controllers/UserController";
import { adminAuth } from "../middlewares/adminAuth";
import { userAuth } from "../middlewares/userAuth";


export const router = express.Router();

// User Routes
router.get('/users', userAuth, userController.getUsers);
router.get('/user/:id', userAuth, userController.getUser);
router.post('/user', adminAuth, userController.createUser);
router.delete('/user/:id', adminAuth, userController.deleteUser);
router.patch('/user/:id', adminAuth, userController.updateUser);

// Recovery Password Route
router.post('/recovery', userController.recoveryPassword);
router.post('/changepassword', userController.changePassword);

// Login Route
router.post('/login', userController.login);