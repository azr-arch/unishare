import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="w-full h-full">
                <Header />
                <div className="py-20 px-6 w-full h-full  max-w-screen-xl mx-auto ">{children}</div>
            </div>
            <Toaster />
        </>
    );
};

export default MainLayout;
