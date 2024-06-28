import React from 'react';
import UILoadingSkeleton from '@/components/ui/loading/skeleton';

const Loading = () => {
    return (
        <div className="w-full">
            <UILoadingSkeleton height={40} />
            <div className="mt-8">
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">
                    <div className="grid grid-cols-1 gap-x-3 gap-y-3"></div>
                    <UILoadingSkeleton height={40} />
                    <UILoadingSkeleton height={40} />
                    <UILoadingSkeleton height={40} />
                    <UILoadingSkeleton height={40} />
                    <UILoadingSkeleton height={40} />
                    <UILoadingSkeleton height={40} />
                </div>
                <UILoadingSkeleton height={130} />
            </div>
            <UILoadingSkeleton height={40} />
            <UILoadingSkeleton height={140} />
        </div>
    );
};

export default Loading;
