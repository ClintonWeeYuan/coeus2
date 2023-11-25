import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { validateToken } from "@/actions/user";

const loggedOutUser = { id: -1, email: "", isLoggedIn: false }

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
    const router = useRouter()

    const [user, setUser] = useState(loggedOutUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const token = Cookies.get("token");

        if (!token) {
            router.replace("/auth/login"); // If no token is found, redirect to login page
            return;
        }

        // Validate the token by making an API call
        const runValidation = async () => {
            try {
                const res = await validateToken(token)

                if(!res || res.status != 200){
                    setUser(loggedOutUser)
                } else {
                    const { id, email } = res.data as {id: number, email: string};
                    setUser({ id , email, isLoggedIn: true })
                }
            } catch (error) {
                console.error(error);
                setUser(loggedOutUser)
                router.replace("/auth/login"); // Redirect to login if token validation fails
            }
        };

        runValidation();
        setLoading(false);
    }, [router]);

    return { user, loading }
};

export default useUser;