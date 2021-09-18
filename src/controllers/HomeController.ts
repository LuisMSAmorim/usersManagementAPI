import { Request, Response } from "express"


class HomeController {

    async index(request: Request, response: Response){
       response.send('teste');
    }; 
};

export const homeController = new HomeController();