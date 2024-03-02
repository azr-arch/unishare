import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="flex items-center gap-x-1 transition hover:opacity-75">
                <Image src={"/logo.svg"} width={30} height={30} alt="Unishare Logo" />

                <p className="text-[#213343] font-medium ">
                    <b className="text-[#394149]">Uni</b>
                    share
                </p>
            </div>
        </Link>
    );
};
