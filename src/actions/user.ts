"use server"
import {prisma} from "@/db";
import {loginSchema, newUserSchema} from "@/lib/zodSchema";
import {z} from "zod";
import jwt, {JwtPayload} from "jsonwebtoken";
import {LoginError} from "@/lib/customErrors/loginError";

type NewUser = z.infer<typeof newUserSchema>

export async function createUser(data : NewUser){
    const users = await prisma.user.create({
        data: {
            ...data,
            weekSchedule: {
                create: {
                    schedule: '',
                    timezone: '',
                }
            }
        }
    })

    console.log(users);

    return users;
}

type LoginDetails = z.infer<typeof loginSchema>
export async function login(data: LoginDetails): Promise<{success: boolean, token?: string}>{
    const {email, password} = data;
    const user  = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if(!user){
        throw new LoginError({name: "NO_USER_FOUND", message: "No such user with this email address exists"})
    }

    if(user.password != data.password){
        throw new LoginError({name: "INCORRECT_PASSWORD", message: "Incorrect email and/or password"})
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "123456789", {
        expiresIn: "10m",
    });

    return {
        success: true,
        token,
    };
}

export const validateToken = async (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456789") as JwtPayload;
    if (!decoded) {
        return { message: "Expired",  status: 400}
    } else if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return {messsage: "Expired", status: 400};
    } else {
        // If the token is valid, return some protected data.
        return { data: decoded, status: 200 };
    }
}