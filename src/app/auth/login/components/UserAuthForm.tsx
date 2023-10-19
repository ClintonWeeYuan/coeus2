"use client"

import * as React from "react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FcGoogle} from "react-icons/fc";
import {createUser, login} from "@/actions/user";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {loginSchema} from "@/lib/zodSchema";
import {useRouter} from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import {LoginError} from "@/lib/customErrors/loginError";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}
type Input = z.infer<typeof loginSchema>

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const router = useRouter()
    const {toast} = useToast()
    
    const [loading, setLoading] = React.useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Input>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<Input> = async (data) => {
        setLoading(true)

        try {
            const result = await login(data);
            const {token, success} = result;
            if(!success){
                console.log("Something went wrong");
                toast({
                    title: "Something went wrong",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    variant: "destructive"
                })
                } else {
                document.cookie = `token=${token}; path=/`;
                await router.push("/")
            }
        } catch(e){
            if(e instanceof LoginError){
                toast({
                    title: e.message,
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    variant: "destructive"
                })
            }
        } finally{
            setLoading(false)
        }

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={loading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            {...register("password")}
                            type="password"
                            disabled={loading}
                        />
                    </div>
                    <Button disabled={loading}>
                        {loading ? (
                            "Loading..."
                        ) : "Sign In with Email"}

                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={loading}>
                {loading ? (
                    "Loading..."
                ) : (
                    <>
                        <FcGoogle className="mr-4 text-black"/> Google
                    </>
                )}

            </Button>
        </div>
    )
}

export default UserAuthForm