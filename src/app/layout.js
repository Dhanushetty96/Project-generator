import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/components/ProviderWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "PickNBuild",
    description: "Build Your Perfect Website in Minutes",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ProviderWrapper>{children}</ProviderWrapper>
            </body>
        </html>
    );
}
