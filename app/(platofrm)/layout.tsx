import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <div className="w-full h-full">
                <Header />
                {children}
            </div>
        </ClerkProvider>
    );
};

export default MainLayout;
