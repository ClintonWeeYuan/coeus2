"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: <RiDashboardFill className="text-xl"/>,
    },
    {
        name: 'Schedule',
        link: '/schedule',
        icon: <AiFillSchedule className="text-xl"/>,
    },
    {
        name: 'Homework',
        link: '/homework',
        icon: <MdLibraryBooks className="text-xl"/>,
    },
    {
        name: 'Knowledge Base',
        link: '/knowledgebase',
        icon: <LuBrainCircuit className="text-xl"/>,
    },
]


const MenuItems = () => {
    const path = usePathname()
    return (
        <div className="px-2 md:px-4 py-4">
            {menuItems.map((link) => (
                <div
                    key={link.name}
                    className="flex relative items-center p-2 hover:bg-secondary-300 hover:bg-accent-500 hover:text-white hover:cursor-pointer rounded-lg mb-2"
                >
                    {path === link.link ? (
                        <motion.div
                            layoutId="underline"
                            className="absolute top-0 left-0 z-10 w-full h-full bg-accent-500 rounded-lg"
                        />
                    ) : (
                        <></>
                    )}
                    <Link
                        className={cn("z-20 w-full h-full flex items-center rounded-lg transition-colors ease-linear", path === link.link && "text-white")}
                        href={link.link}
                    >
                        {link.icon}
                        <p className="ml-2 px-2 py-2">{link.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MenuItems;