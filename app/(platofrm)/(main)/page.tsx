import { Button } from "@/components/ui/button";
import { auth, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const MainPage = () => {
    // const { user } = auth();

    // if(user) {
    //     redirect("/dashboard")
    // }

    return (
        <div className="w-full h-full pt-20 px-4 max-w-6xl">
            {/* Info section */}
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col gap-y-3 md:gap-y-4  justify-center w-[90%] h-full text-center">
                    <h1 className="text-[#091135] text-4xl md:text-6xl font-bold">
                        Universal Sharing Platform
                    </h1>
                    <p className="text-sm text-[#091135]">
                        Upload, host, and share your documents, images, and videos with just a few
                        clicks. Experience the ease of sharing with UniShare!
                    </p>

                    <Link href={"/sign-in"}>
                        <Button
                            variant={"secondary"}
                            className="bg-[#358dff] hover:bg-blue-700 w-fit mx-auto text-white"
                        >
                            Try for free!
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Auth section */}
            {/* <SignIn path="/" routing="path" /> */}
        </div>
    );
};

export default MainPage;
