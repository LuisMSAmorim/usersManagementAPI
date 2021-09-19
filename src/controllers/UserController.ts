import { request, Request, Response } from "express";
import validator from "validator";
import { user } from "../models/User";
import { passwordToken } from "../models/PasswordToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const secret = '#######'

class UserController{

    async createUser(request: Request, response: Response){
        const { name, email, password, password2, admin } = request.body;

        try{
            if(!name){
                return response.status(400).json({name: 'Invalid name'});
            };
            if(!validator.isEmail(email)){
                return response.status(400).json({email: 'Invalid email'});
            };
            if(!validator.isStrongPassword(password)){
                return response.status(400).json({password: 'Your password must have 6 characters and 1 upper case, 1 lower case and 1 symbol'});
            };
            if(password != password2){
                return response.status(400).json({password: 'Passowords dont match'});
            };
            if(typeof(admin) != 'boolean'){
                return response.status(400).json({admin: "Invalid admin boolean"});
            };
            
            const emailSnapshot = await user.findEmail(email);

            if(emailSnapshot){
                return response.status(400).json({email: 'Email already in use'});
            };

            await user.create(name, email, password, admin);

            return response.status(201).json({message: `User ${name}, registered`});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async getUsers(request: Request, response: Response){
        try{
            const usersSnapshot = await user.getAll();

            if(!usersSnapshot){
                return response.status(404).json({error: 'Users not found'});
            };
            
            return response.status(200).json({users: usersSnapshot});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async getUser(request: Request, response: Response){
        const id = Number.parseInt(request.params.id);

        try{
            const userSnapshot = await user.get(id);

            if(!userSnapshot){
                return response.status(404).json({error: 'User not found'})
            };

            return response.status(200).json({user: userSnapshot});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async deleteUser(request: Request, response: Response){
        const id = Number.parseInt(request.params.id);

        try{
            const idSnapshot = await user.findId(id);

            if(!idSnapshot){
                return response.status(404).json({error: 'User not found'});
            };

            await user.delete(id);

            return response.status(200).json({message: `User ${id} deleted`});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async updateUser(request: Request, response: Response){
        const id = Number.parseInt(request.params.id);
        const { name, email, admin } = request.body;

        try{
            const idSnapshot = await user.findId(id);

            if(!idSnapshot){
                return response.status(404).json({error: 'User not found'});
            };

            if(!name){
                return response.status(400).json({name: 'Invalid name'});
            };
            if(!validator.isEmail(email)){
                return response.status(400).json({email: 'Invalid email'});
            };
            if(typeof(admin) != 'boolean'){
                return response.status(400).json({admin: "Invalid admin boolean"});
            };
            
            const emailSnapshot = await user.findEmail(email);

            if(emailSnapshot && emailSnapshot != email || emailSnapshot){
                console.log(emailSnapshot)
                return response.status(400).json({email: 'Email already in use'});
            };

            await user.update(id, name, email, admin);

            return response.status(200).json({message: `User ${id} updated`});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async recoveryPassword(request: Request, response: Response){
        const { email } = request.body;

        try{
            if(!email){
                return response.status(400).json({email: 'Invalid email'});
            };

            const token = await passwordToken.create(email);

            if(!token){
                return response.status(404).json({error: 'User not found'});
            };

            return response.status(201).json({message: `Token ${token} created`});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async changePassword(request: Request, response: Response){
        const { token, email, password, password2 } = request.body;

        try{
            if(!email){
                return response.status(400).json({email: 'Invalid email'});
            };
            if(!validator.isStrongPassword(password)){
                return response.status(400).json({password: 'Your password must have 6 characters and 1 upper case, 1 lower case and 1 symbol'});
            };
            if(password != password2){
                return response.status(400).json({password: 'Passowords dont match'});
            };

            const tokenValidate = await passwordToken.validate(token, email);

            if(!tokenValidate){
                return response.status(406).json({token: 'Invalid Token'});
            };

            await user.changePassword(password, tokenValidate.user_id, token);

            return response.status(200).json({message: 'Password changed'});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };

    async login(request: Request, response: Response){
        const { email, password } = request.body;

        try{
            const findUser = await user.userLogin(email);

            if(!findUser){
                return response.status(404).json({error: 'User not found'});
            };
    
            const compare = await bcrypt.compare(password, findUser.password);

            if(!compare){
                return response.status(406).json({error: 'Invalid password'});
            };

            const token = jwt.sign({email, admin: findUser.admin}, secret);

            return response.status(200).json({token});
        }catch(err){
            return response.status(500).json({error: err});
        };
    };
};

export const userController = new UserController();