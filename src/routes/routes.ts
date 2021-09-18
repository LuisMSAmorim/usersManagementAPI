import express from "express";
import { homeController } from "../controllers/HomeController";
import { userController } from "../controllers/UserController";
export const router = express.Router();

// Home Route
router.get('/', homeController.index);

// User Routes
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', userController.createUser);
router.delete('/user/:id', userController.deleteUser);
router.patch('/user/:id', userController.updateUser);