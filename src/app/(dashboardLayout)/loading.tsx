import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Spinner className="size-5"/>
        </div>
    );
};

export default Loading;