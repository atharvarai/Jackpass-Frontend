import { Link } from 'react-router-dom';
import { useState } from 'react';
import "../styles/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#1E28FF] border-b border-gray-200 navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <a href="#" className="flex-shrink-0 flex items-center">
                            <img src="https://jackpass.io/static/media/jackpass%20full%20logo%20white.294d6ca47ec6b07af43a36c2b3cc384f.svg"
                                alt="Jackpass"
                                className="h-8 sm:h-10 w-auto" />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex text-white text-xl tracking-wide justify-end items-center gap-10">
                        <Link to="/" className="nav-button cursor-pointer">Events</Link>
                        <Link to="/communities" className="nav-button cursor-pointer">Communities</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/"
                                className="text-white block px-3 py-2 text-base font-medium hover:bg-blue-600 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Events
                            </Link>
                            <Link to="/communities"
                                className="text-white block px-3 py-2 text-base font-medium hover:bg-blue-600 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Communities
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
