import React from 'react';
import {Card, CardHeader, CardTitle, CardFooter, CardDescription, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {RxGithubLogo} from "react-icons/rx"
import {FcGoogle} from "react-icons/fc"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import SignupForm from "@/app/auth/signup/components/SignupForm";

const Page = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <SignupForm/>
        </div>
    );
};

export default Page;