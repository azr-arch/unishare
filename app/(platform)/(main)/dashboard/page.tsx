import { FileUploadModal } from "@/components/modals/upload";
import { FileList } from "./_components/file-list";

import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const DashboardPage = async () => {
    const preloadedFiles = await preloadQuery(api.file.getFiles);

    return (
        <div className="px-4 flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold">My files</h1> <FileUploadModal />
            </div>

            <FileList preloadedData={preloadedFiles} />
        </div>
    );
};
export default DashboardPage;
