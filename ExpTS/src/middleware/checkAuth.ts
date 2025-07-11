import { Request, Response, NextFunction } from "express";


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.logado){  
        next() 
    } else {
        res.status(403).send("U shall not pass")
    }
}