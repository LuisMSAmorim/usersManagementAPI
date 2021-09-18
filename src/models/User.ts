import { knex } from "../database/connection";
import bcrypt from "bcrypt";


export class User{

    async create(name: string, email: string, password: string, admin: boolean){
        try{
            const hash = await bcrypt.hash(password, 10);

            await knex.insert({email, password: hash, name, admin}).table("users");
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

            return true;
        }catch{
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
        }catch(err){
            return err;
        };
    };

    async update(id: number, name: string, email: string, admin: boolean){
        try{
            await knex.update({id, name, email, admin}).from('users').where({id});
        }catch(err){
            return err
        };
    };
};

export const user = new User();