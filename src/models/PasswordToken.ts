import { knex } from "../database/connection";
import { v4 as uuidv4 } from "uuid";

class PasswordToken{

    async create(email: string){
        try{
            const user =  await knex.select('*').from('users').where({email});
            const token = uuidv4();
    
            if(user.length == 0){
                return false;
            };

            await knex.insert({
                token,
                user_id: user[0].id,
                used: false
            }).table('passwordtokens');

            return token;
        }catch(err){
           return err;
        };
    };
};

export const passwordToken = new PasswordToken();