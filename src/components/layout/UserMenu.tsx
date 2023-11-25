"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsChevronDown } from "react-icons/bs";
import React from 'react';
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const UserMenu = () => {
    const router = useRouter()
    const logOut = () => {
        Cookies.remove("token")
        router.push("/auth/login")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 border border-slate-200 bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 w-9">
                    <BsChevronDown/></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator/>

                <DropdownMenuItem>
                    <FiLogOut className="mr-2 h-4 w-4"/>
                        <button type="button" onClick={logOut}>Log out</button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;