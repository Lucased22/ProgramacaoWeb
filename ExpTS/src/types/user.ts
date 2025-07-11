import { User } from "@prisma/client";

export type createUserDTO = Pick<User, "fullname" | "email" | "major_id" | "password">
export type loginDto = Pick<User, "email" | "password">