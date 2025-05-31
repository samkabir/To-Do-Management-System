import React from 'react';

const Navbar = () => {

    return (
        <div className="grid grid-cols-12 gap-0 bg-[#19192a] shadow-md text-white sticky top-0 z-[9999]">
            <div className="col-start-2 col-end-12">
                <header className="h-[60px] flex items-center justify-center">
                    <span className="font-bold text-xl">To-Do Task Management System</span>
                </header>
            </div>
        </div>
    );
};

export default Navbar;
