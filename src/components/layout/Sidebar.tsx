import { AiOutlineMenu } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/layout/UserMenu";
import MenuItems from "@/components/layout/MenuItems";

const Sidebar = () => {
    return (
        <aside className="fixed hidden md:block top-0 left-0 z-40 w-96 h-screen py-6">
            <div className="flex justify-between items-center py-4 px-8">
                <p className="text-2xl font-bold">Coeus</p>
                <AiOutlineMenu className="text-2xl"/>
            </div>

            <Separator className="my-4"/>

            <div className="px-8 flex justify-between mb-4">
                <div className="flex">
                    <Avatar className="rounded-lg mr-2">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col px-2">
                        <p>Clinton Wee</p>
                        <p className="text-xs text-gray-500">Tutor in Training</p>
                    </div>
                </div>
                <UserMenu/>
            </div>
            <MenuItems/>
        </aside>
    );
};

export default Sidebar;