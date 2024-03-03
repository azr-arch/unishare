import { FileUploadModal } from "@/components/modals/upload";
import { FileList } from "./_components/file-list";

const DashboardPage = () => {
    return (
        <div className="px-4 flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold">My files</h1> <FileUploadModal />
            </div>

            <FileList />
        </div>
    );
};
export default DashboardPage;
