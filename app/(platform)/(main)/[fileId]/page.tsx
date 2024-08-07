import { DocumentPlaceholder } from "./_components/document-placeholder";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface DocumentPageProps {
    params: {
        fileId: string;
    };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
    const preloadedFile = await preloadQuery(api.file.getFileById, { fileId: params.fileId });

    return (
        <div className="mx-auto w-full h-full flex  justify-center ">
            <DocumentPlaceholder preloadedData={preloadedFile} />
        </div>
    );
};

export default DocumentPage;
