"use client"
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { validateToken } from "@/actions/user";

function ProtectedPage() {
    const protectedPages = ["/dashboard", "/homework", "/knowledgebase", "/schedule"]

    const router = useRouter();
    const currentURL = usePathname()

    useEffect(() => {
        if(!(protectedPages.includes(currentURL))){
            return;
        }

        const token = Cookies.get("token");

        if (!token) {
            router.replace("/auth/login"); // If no token is found, redirect to login page
            return;
        }

        // Validate the token by making an API call
        const runValidation = async () => {
            try {
                const res = await validateToken(token)
                console.log(res)

                if (!res) throw new Error("Token validation failed");
            } catch (error) {
                console.error(error);
                router.replace("/auth/login"); // Redirect to login if token validation fails
            }
        };

        runValidation();
    }, [router]);

    return <></>;
}

export default ProtectedPage