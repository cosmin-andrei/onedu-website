"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Bars3Icon } from "@heroicons/react/24/solid";

const MENU_ITEMS = [
    { label: "Planul nostru", href: "/plan" },
    { label: "Școala ONedu", href: "/scoala" },
    { label: "Sponsorizează 20%", href: "/sponsorizeaza" },
    { label: "Merch", href: "/merch" },
    { label: "Blog", href: "/blog" },
];

const SUB_MENU_ITEMS = {
    donate: [
        { label: "Donează online", href: "/doneaza" },
        { label: "Transfer bancar", href: "/transfer" },
        { label: "SMS", href: "/sms" },
        { label: "Redirecționează 3,5%", href: "/redirectioneaza" },
        { label: "Campania ta", href: "/campanii" },
    ],
    about: [
        { label: "Despre noi", href: "/despre" },
        { label: "Proiecte", href: "/proiecte" },
        { label: "Premii", href: "/premii" },
        { label: "Rapoarte", href: "/rapoarte" },
        { label: "Susținători", href: "/parteneri" },
    ],
};

export function Navbar() {
    const [donateMenuOpen, setDonateMenuOpen] = useState(false);
    const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className="flex justify-between items-center p-[0.05rem_0.6rem_0.1rem] bg-transparent relative"
        >
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <Image src="/logo.webp" alt="Logo" width={120} height={40} />
                </Link>
            </div>

            {/* Main Navigation */}
            <nav
                className={`${
                    menuOpen ? "flex flex-col absolute top-full right-0 bg-white w-full z-[999]" : "hidden"
                } lg:flex flex-grow justify-end mr-[1rem]`}
            >
                <ul className="list-none flex lg:flex-row flex-col gap-[0.7rem] text-[15px]">
                    <li
                        className="relative"
                        onMouseEnter={() => setDonateMenuOpen(true)}
                        onMouseLeave={() => setDonateMenuOpen(false)}
                    >
                        <span
                            className="flex items-center gap-[1rem] text-[#212529] font-bold p-[0.3rem_0.6rem] rounded-[5px] cursor-pointer hover:bg-[#e2e6ea]"
                        >
                            Donează <FaChevronDown className="text-[0.8rem]" />
                        </span>
                        {donateMenuOpen && (
                            <ul className="absolute top-[calc(100%+0.2rem)] left-0 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] rounded-[5px] list-none p-[0.7rem_0] m-0 z-[100] min-w-[180px]">
                                {SUB_MENU_ITEMS.donate.map((item) => (
                                    <li key={item.href} className="p-[0.4rem_1rem] hover:bg-[#f1f1f1]">
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    {MENU_ITEMS.map((item) => (
                        <li key={item.href} className="relative">
                            <Link href={item.href} className="flex items-center gap-[1rem] text-[#212529] font-bold p-[0.3rem_0.6rem] rounded-[5px] cursor-pointer hover:bg-[#e2e6ea]">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li
                        className="relative"
                        onMouseEnter={() => setAboutMenuOpen(true)}
                        onMouseLeave={() => setAboutMenuOpen(false)}
                    >
                        <span
                            className="flex items-center gap-[1rem] text-[#212529] font-bold p-[0.3rem_0.6rem] rounded-[5px] cursor-pointer hover:bg-[#e2e6ea]"
                        >
                            Despre noi <FaChevronDown className="text-[0.8rem]" />
                        </span>
                        {aboutMenuOpen && (
                            <ul className="absolute top-[calc(100%+0.2rem)] left-0 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] rounded-[5px] list-none p-[0.7rem_0] m-0 z-[100] min-w-[180px]">
                                {SUB_MENU_ITEMS.about.map((item) => (
                                    <li key={item.href} className="p-[0.4rem_1rem] hover:bg-[#f1f1f1]">
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Actions and Toggle Button */}
            <div className="flex items-center gap-[1rem]">
                <FaShoppingCart className="text-[1.2rem] cursor-pointer hover:text-[#00264f] transition-colors" />
                <Link href="/doneaza">
                    <button className="bg-[#1b0177] text-white border-none p-[0.4rem_0.8rem] font-bold text-[14px] cursor-pointer rounded-[5px] flex items-center gap-[0.5rem] hover:bg-[#120560]">
                        <FaHeart className="text-[1rem]" /> Donează
                    </button>
                </Link>

                {/* Toggle Button for Mobile Menu */}
                <button
                    className="block lg:hidden bg-none border-none cursor-pointer z-[1000]"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Bars3Icon className="text-[#212529] text-[1.5rem]" />
                </button>
            </div>
        </header>
    );
}

export default Navbar;