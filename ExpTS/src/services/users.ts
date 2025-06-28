import { PrismaClient, User } from "@prisma/client";
import {createUserDTO} from "../types/user.js";

const prisma = new PrismaClient();

export const getUsers = async():Promise<User[]> => {
    return await prisma.user.findMany()
}

export const createUser = async(User: createUserDTO):Promise<User> => {
    return await prisma.user.create({data:User});
}

export const getUser = async(id: string):Promise<User | null> => {
    return await prisma.user.findFirst({
        where: { id }
    });
}

export const removeUser = async(id: string):Promise<User | null> => {
    return await prisma.user.delete({
        where: { id }
    });
}

export const updateUser = async(id: string, User: createUserDTO):Promise<User> => {
    return await prisma.user.update({
        where: { id },
        data: User
    });
}