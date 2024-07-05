'use client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

//@ts-ignore
export default function ImageInput({ label, imageUrl = "", setImageUrl, className = "col-span-full", endpoint = "imageUploader",
}) {

    const { toast } = useToast()

    return (
        <div className={className}>
            <div className="flex justify-between items-center mt-4">
                <label
                    htmlFor="course-image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
                {imageUrl && (
                    <Button
                        onClick={() => setImageUrl("")}
                        type="button"
                        variant={'ghost'}
                        className="flex space-x-2 rounded-md shadow"
                    >
                        <Pencil className="w-5 h-5" />
                        <span>Change Image</span>
                    </Button>
                )}
            </div>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Item image"
                    width={1000}
                    height={667}
                    className="w-full h-64 object-cover"
                />
            ) : (
                <UploadDropzone
                    //@ts-ignore
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].url);
                        // Do something with the response
                        console.log("Files: ", res);
                        toast({ title: "Upload Completed" });
                    }}
                    onUploadError={(error) => {
                        // Do something with the error.
                        console.log(`ERROR! ${error.message}`);
                    }}
                />
            )}
        </div>
    );
}