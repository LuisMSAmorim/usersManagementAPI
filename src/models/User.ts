import { knex } from "../database/connection";
import bcrypt from "bcrypt";


export class User{

    async create(name: string, email: string, password: string, admin: boolean){
        try{
            const hash = await bcrypt.hash(password, 10);

            await knex.insert({email, password: hash, name, admin}).table("users");
            
            return true;
        }catch(err){
            return err;
        };
    };

    async findEmail(email: string){
        try{
            const result = await knex.select('email').from('users').where({email});
            
            if(result.length == 0){
                return false;
            };

            const emailData = result[0].email

            return emailData;
        }catch{
            return false;
        };
    };

    async userLogin(email:string){
        try{
            const result = await knex.select('email', 'password', 'admin').from('users').where({email});

            if(result.length == 0){
                return false;
            };

            return result[0];
        }catch(err){
            return false;
        };
    };

    async findId(id: number){
        try{
            const result = await knex.select('id').from('users').where({id});

            if(result.length == 0){
                return false;
            };

            return true;
        }catch{
            return false;
        };
    };

    async getAll(){
        try{
            const result = await knex.select('*').from('users');

            if(result.length == 0){
                return false;
            };

            return result;
        }catch(err){
            return err;
        };
    };

    async get(id: number){
        try{
            const result = await knex.select('*').from('users').where('id', id);

            if(result.length == 0){
                return false;
            };

            return result
        }catch(err){
            return err;
        };
    };

    async delete(id: number){
        try{
            await knex.del().from('users').where({id});

            return true;
        }catch(err){
            return err;
        };
    };

    async update(id: number, name: string, email: string, admin: boolean){
        try{
            await knex.update({id, name, email, admin}).from('users').where({id});

            return true;
        }catch(err){
            return err
        };
    };

    async changePassword(newPassword:string, id:number, token: string){
        try{
            const hash = await bcrypt.hash(newPassword, 10);

            await knex.update({password: hash}).table('users').where({id});

            await knex.update({used: true}).table('passwordtokens').where({token});

            return true;
        }catch(err){
            return false;
        };
    };
};

export const user = new User();