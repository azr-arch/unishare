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
    return <DocumentPlaceholder preloadedData={preloadedFile} />;
};

export default DocumentPage;
