import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const secret = '######'

export const userAuth = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const authToken = request.headers['authorization'];

        if(!authToken){
            return response.status(403).json({token: 'Invalid AuthToken'});
        };

        const bearer = authToken.split(' ');
        const token = bearer[1];

        const decoded: any = jwt.verify(token, secret);

        if(!decoded){
            return response.status(401).json({error: 'User not authorized'});
        };

        next();
    }catch(err){
        return response.status(500).json({error: err});
    };
};