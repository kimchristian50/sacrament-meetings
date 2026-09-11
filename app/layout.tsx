import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

// Load Google Font 'Inter' with optimized subsetting
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Sacrament Meeting Planner',
    description: 'Plan, manage, and view ward sacrament meeting programs.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
                {/* App-wide persistent header */}
                <Header />

                {/* Main page content container */}
                <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
                    {children}
                </main>

                {/* App-wide persistent footer */}
                <Footer />
            </body>
        </html>
    );
}
