import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
        </>
    );
}
