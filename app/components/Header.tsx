
import NavLinks from './NavLinks';

export default function Header() {
    // Format current date nicely: "Sunday, September 13, 2026"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    }).format(new Date());

    return (
        <header className="bg-slate-800 text-white py-4 shadow-md border-b border-slate-700">
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                {/* Ward Title & Date Subtitle */}
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold tracking-tight">Taylor Ranch Ward</h1>
                    <p className="text-xs text-slate-300 font-medium">{formattedDate}</p>
                </div>

                {/* Navigation Links */}
                <NavLinks />
            </div>
        </header>
    );
}