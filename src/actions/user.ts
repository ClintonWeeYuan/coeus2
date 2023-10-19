"use server"
import {prisma} from "@/db";
import {newUserSchema} from "@/lib/zodSchema";
import {z} from "zod";

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