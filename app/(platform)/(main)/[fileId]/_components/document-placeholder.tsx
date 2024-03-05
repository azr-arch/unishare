import Image from "next/image";

interface DocumentPlaceholderProps {
    link: string;
}

export const DocumentPlaceholder = ({ link }: DocumentPlaceholderProps) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Image
                src={link}
                className="relative aspect-square object-contain"
                width={500}
                height={500}
                alt="image"
            />
        </div>
    );
};
