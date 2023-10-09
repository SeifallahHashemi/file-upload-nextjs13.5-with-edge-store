import React from 'react';
import {MultiFileDropzoneUsage} from "@/components/files/MultiFileDropzoneUsage";

const Page = () => {
    return (
        <div className={"max-w-screen max-h-screen grid place-content-center place-items-center"}>
            <MultiFileDropzoneUsage />
        </div>
    );
};

export default Page;