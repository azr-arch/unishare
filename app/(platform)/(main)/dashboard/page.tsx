import { FileUploadModal } from "@/components/modals/upload";
import { FileList } from "./_components/file-list";

import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const DashboardPage = async () => {
    const preloadedFiles = await preloadQuery(api.file.getFiles);

    return (
        <div className=" mx-auto flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center ">
                <h1 className="text-2xl font-bold">Your files</h1> <FileUploadModal />
            </div>

            <FileList preloadedData={preloadedFiles} />
        </div>
    );
};
export default DashboardPage;
