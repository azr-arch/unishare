interface DocumentPageProps {
    params: {
        documentId: string;
    };
}

const DocumentPage = ({ params }: DocumentPageProps) => {
    console.log({ params });

    return <div>document page</div>;
};

export default DocumentPage;
