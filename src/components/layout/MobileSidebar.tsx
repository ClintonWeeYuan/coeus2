"use client"

import { motion, AnimatePresence } from "framer-motion";
import OutsideDetecter from "@/components/hooks/useOutsideDetect";
import MenuItems from "@/components/layout/MenuItems";
import MenuIcon from "@/components/layout/MenuIcon";
import { FC, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/layout/UserMenu";

const MobileSidebar: FC = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleOutsideClick = () => {
        setOpenSidebar(false);
    };

    return (
        <OutsideDetecter
            callback={() => {
                handleOutsideClick();
            }}
        >
            <button
                onClick={() => setOpenSidebar(!openSidebar)}
                className="md:hidden z-20 rounded-full fixed bottom-4 right-4"
            >
                <MenuIcon isOpen={openSidebar}/>
            </button>
            <AnimatePresence>
                {openSidebar && (
                    <motion.aside
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ ease: 'linear' }}
                        className="top-0 fixed left-0 z-50 h-full bg-white w-3/5 md:hidden"
                    >
                        <div className="flex justify-between items-center px-4">
                            <p className="font-bold">Coeus</p>
                            <AiOutlineMenu/>
                        </div>

                        <Separator className="my-4"/>

                        <div className="px-4 flex justify-between">
                            <Avatar className="rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col px-2">
                                <p>Clinton Wee</p>
                                <p className="text-xs text-gray-500">Tutor in Training</p>
                            </div>
                            <UserMenu/>
                        </div>
                        <MenuItems/>
                    </motion.aside>
                )}
            </AnimatePresence>
        </OutsideDetecter>
    );
};

export default MobileSidebar;
