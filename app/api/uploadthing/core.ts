import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import type { NextRequest } from "next/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = (req: NextRequest) => {
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(({ req }) => handleAuth(req))
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf"])
        .middleware(({ req }) => handleAuth(req))
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;