import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingCartButton from "@/components/Cart/FloatingCartButton";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <FloatingCartButton />
            <Footer />
        </>
    );
}
