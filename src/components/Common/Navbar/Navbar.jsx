
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GetIcon } from "../../../icons";


const Navbar = () => {
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);


    return (
        <div className="grid grid-cols-12 gap-0 bg-[#19192a] shadow-md text-white sticky top-0 z-[9999]">
            <div className="col-start-2 col-end-12">
                <header className="h-[80px] flex items-center">
                    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                        {/* Logo */}
                        <div className="">
                            <Link href="/">
                                {/* <Image src={Logo} alt="CasinoMadness" width={120} height={30} /> */}
                                {/* Logo */}
                                LOGO
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex space-x-1">
                            <Link href="/" className="hover:bg-white hover:rounded-xl hover:text-black p-3 transition-all ease-out duration-500">
                                <li >
                                    Home
                                </li>
                            </Link>

                            <li className="relative group hover:bg-white hover:rounded-xl transition-all ease-out duration-500">
                                <Link href="/casinos" className="flex items-center p-3 group-hover:text-black ">
                                    DropdownMenu
                                    <GetIcon name="ArrowDown" className="w-5 h-5 text-red-500" />
                                </Link>
                                {/* Dropdown Menu */}
                                <ul className="absolute bg-[#19192a] p-3 w-56 top-[60px] -left-5 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg z-[99] rounded-xl">
                                    <Link href="/Link1">
                                        <li className="text-sm hover:bg-slate-100 leading-8 hover:text-[#19192a] px-3 rounded-xl">
                                            Link1
                                        </li>
                                    </Link>
                                    <Link href="/Link2">
                                        <li className="text-sm hover:bg-slate-100 leading-8 hover:text-[#19192a] px-3 rounded-xl">
                                            Link2
                                        </li>
                                    </Link>
                                    <Link href="/Link3">
                                        <li className="text-sm hover:bg-slate-100 leading-8 hover:text-[#19192a] px-3 rounded-xl">
                                            Link3
                                        </li>
                                    </Link>
                                </ul>
                            </li>


                            <Link href="/Link4" className="hover:bg-white hover:rounded-xl hover:text-black p-3 transition-all ease-out duration-500">
                                <li >
                                    Link 4
                                </li>
                            </Link>
                            <Link href="/Link5" className="hover:bg-white hover:rounded-xl hover:text-black p-3 transition-all ease-out duration-500">
                                <li>
                                    Link5
                                </li>
                            </Link>
                        </ul>

                        {/* Mobile Menu Icon */}
                        <button onClick={toggleMenu} className="md:hidden">
                            <GetIcon name={menuOpen ? 'CrossIcon' : 'HamburgerIcon'} className="w-5 h-5 text-red-500" />
                        </button>
                    </nav>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden bg-[#19192a] shadow-lg font-bold min-h-min absolute inset-0 mt-20 z-[99] overflow-auto">
                            <ul className="p-4 space-y-4">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/casinos">Link</Link>
                                </li>
                                <li>
                                    <Link href="/casinos" className="flex items-center">
                                        DropdownMenu
                                        <GetIcon name="ArrowDown" className="w-5 h-5 text-red-500" />
                                    </Link>
                                    {/* Dropdown Submenu */}
                                    <ul className="pl-6 space-y-2">
                                        <Link href="/Link1">
                                            <li className="py-2">Link1</li>
                                        </Link>
                                        <Link href="/Link2">
                                            <li className="py-2">Link2</li>
                                        </Link>
                                        <Link href="/Link3">
                                            <li className="py-2">Link3</li>
                                        </Link>
                                    </ul>
                                </li>

                                <li>
                                    <Link href="/Link4">Link4</Link>
                                </li>

                                <li>
                                    <Link href="/Link5">Link5</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </header>
            </div>
        </div>
    );
};

export default Navbar;
