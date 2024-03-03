import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="w-full h-full">
                <Header />
                <div className="pt-20 w-full h-full">{children}</div>
            </div>
            <Toaster />
        </>
    );
};

export default MainLayout;
