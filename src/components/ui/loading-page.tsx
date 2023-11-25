import React from 'react';
import Spinner from "@/components/ui/spinner";

const LoadingPage = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Spinner className="h-12 w-12"/>
        </div>
    );
};

export default LoadingPage;