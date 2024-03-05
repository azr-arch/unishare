import { getFileUrl } from "@/lib/utils";
import { DocumentPlaceholder } from "./_components/document-placeholder";

interface DocumentPageProps {
    params: {
        fileId: string;
    };
}

const DocumentPage = ({ params }: DocumentPageProps) => {
    const fileUrl = getFileUrl(params.fileId);

    return <DocumentPlaceholder link={fileUrl} />;
};

export default DocumentPage;
