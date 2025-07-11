import { Request, Response } from "express";
import { createUser, getUsers, getUser, removeUser, updateUser, checkAuth } from "../services/users";
import { getMajors, getMajor } from "../services/major";
import { loginDto } from "../types/user";
import { log } from "console";

const index = async(req: Request, res: Response) => {
    try{
        const users = await getUsers(); 
        res.render("user/index", {
            users,
        });
    }
    catch(error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send(error);
    }
};

export const create = async(req: Request, res: Response) => {
    if(req.method === "GET") {
        try{
            const majors = await getMajors();
            res.render("user/create", {
                majors,
            });
        }
        catch(err){
            console.log(err);
            res.status(500).send("Erro ao buscar usuários durante a criação");
        }
    }else if(req.method === "POST") {
        try{
            const user = req.body;
            await createUser(user);
            res.redirect("/users");
        }
        catch(err){
            console.log(err);
            res.status(500).send("Erro ao criar usuário");
        }
        
    }
}


export const read = async(req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const user = await getUser(id);
        res.render("user/read",{
            user, 
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erro ao consultar usuário");
    }

}

export const update = async(req: Request, res: Response): Promise<void> => { 
    if(req.method === "GET") {
        try{
            const {id} = req.params;
            const user = await getUser(id);
            if(!user) {
                res.status(404).send("Usuário não encontrado");
                return; 
            }
            res.render("user/create", {
                user,
            });
        }
        catch(err){
            console.log(err);
            res.status(500).send("Erro ao buscar usuário para atualizar");
        }
    }
    else if(req.method === "POST") {
        try{
            const {id} = req.params;
            const updatedData = req.body;
            await updateUser(id, updatedData);
            res.redirect(`/users`);
        }
        catch(err){
            console.log(err);
            res.status(500).send("Erro ao atualizar usuário");
        }
    }
}


export const remove = async(req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const user = await removeUser(id);
        res.status(200).send(`Usuário ${user} deletado com sucesso`);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erro ao remover usuário");
    }
}

export const login = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render("user/login")
    } else {
        const {email, password} = req.body as loginDto
        const ok = await checkAuth(email, password)

        if(!ok) {
            return res.render("user/login", {
                ok
            })
        } else {
            req.session.logado = true
            res.redirect("/")
        }
    }
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid")
        res.redirect("/")
    })
}

export default { index, create, read, update, remove, login, logout};