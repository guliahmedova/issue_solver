import Header from "@/features/Dashboard/Header"
import Sidebar from "@/features/Dashboard/Sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}