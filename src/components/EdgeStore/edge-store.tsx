"use client";

import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import {useState} from "react";
import Link from "next/link";
import {SingleImageDropzone} from "@/components/Images/SingleImageDropzone";

interface ImageProps {
    url: string
    thumbnailUrl: string | null
}
export default function EdgeStore() {
    const [urls, setUrls] = useState<ImageProps>();
    const [file, setFile] = React.useState<File>();
    const [progress, setProgress] = useState(0)
    const { edgestore } = useEdgeStore();

    return (
        <div className={"space-y-6"}>
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                dropzoneOptions={{
                    maxSize: 1024 * 1024,
                }}
                onChange={(file) => {
                    setFile(file);
                }}
            />
            <div className={"w-50 h-2 border rounded overflow-hidden"}>
                <div className={"h-full bg-pink-800 transition-all duration-300"} style={{
                    width: `${progress}%`
                }}></div>
            </div>
            <button
                className={"hover:bg-cyan-950"}
                onClick={async () => {
                    console.log("clicked")
                    if (file) {
                        const res = await edgestore.myPublicImages.upload({
                            file,
                            options: {
                                temporary: true,
                            },
                            input: { type: "post"},
                            onProgressChange: (progress: number) => {
                                // you can use this to show a progress bar
                                console.log(progress);
                                setProgress(progress)
                            },
                        });
                        setUrls({
                            url: res.url,
                            thumbnailUrl: res.thumbnailUrl,
                        })
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        console.log(res);
                    }
                }}
            >
                Upload
            </button>
            {urls?.url && <Link href={urls.url} target={"_blank"}>URL</Link>}
            {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target={"_blank"}>THUMBNAIL URL</Link>}
        </div>
    );
}
