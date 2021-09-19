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

    async validate(token:string, email: string){
        try{
            const result = await knex.select('*').table('passwordtokens').where({token});

            if(result.length == 0){
                return false;
            };

            const tk = result[0];
            const user_id = tk.user_id;

            const emailId = await knex.select('id').table('users').where({email});

            if(emailId[0].id != user_id){
                return false;
            };

            if(tk.used == 1){
                return false;
            };

            return {user_id};
        }catch(err){
            return false;
        };
    };
};

export const passwordToken = new PasswordToken();