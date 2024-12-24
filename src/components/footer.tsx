'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import Image from "next/image";

const FOOTER_MENUS = {
    donate: [
        { href: '/doneaza', label: 'Donează online' },
        { href: '/transfer', label: 'Transfer bancar' },
        { href: '/redirectioneaza', label: 'Redirecționează 3.5%' },
        { href: '/sms', label: 'Donează SMS' },
    ],
    plan: [
        { href: '/abilitati-aptitudini', label: 'Abilități și aptitudini' },
        { href: '/management-scolar', label: 'Management școlar' },
        { href: '/educatie-online', label: 'Educație în online' },
        { href: 'https://ivoluntar.org', label: 'Centrul iVoluntar' },
    ],
    organization: [
        { href: '/despre', label: 'Despre noi' },
        { href: '/proiecte', label: 'Proiecte' },
        { href: '/rapoarte', label: 'Rapoarte' },
        { href: '/blog', label: 'Blog' },
    ],
};

interface MenuItem {
    href: string;
    label: string;
}

export function Footer() {
    const [formData, setFormData] = useState({ firstName: "", email: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to subscribe to newsletter");

            setIsSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };

    const renderMenu = (menuItems: MenuItem[]) => (
        <ul className="list-none p-0 text-base space-y-2">
            {menuItems.map((item, index) => (
                <li key={index} className="text-sm">
                    <Link href={item.href} className="hover:text-blue-gray-500">
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <footer className="bg-[#16366d] text-white mt-4 p-8 text-sm mt-8"> {/* Adăugat mt-8 pentru margine sus */}
            <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[150px] mb-2">
                    <h3 className="font-bold mb-4 text-lg">Donează</h3>
                    {renderMenu(FOOTER_MENUS.donate)}
                </div>
                <div className="flex-1 min-w-[150px] mb-2">
                    <h3 className="font-bold mb-4 text-lg">Planul nostru</h3>
                    {renderMenu(FOOTER_MENUS.plan)}
                </div>
                <div className="flex-1 min-w-[150px] mb-2">
                    <h3 className="font-bold mb-4 text-lg">Organizație</h3>
                    {renderMenu(FOOTER_MENUS.organization)}
                </div>
                <div className="flex-2 min-w-[300px] mb-2 text-left">
                    <h3 className="font-bold mb-4 text-lg">Abonează-te</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prenume"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="p-1 border border-gray-300 rounded text-sm flex-1"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-1 border border-gray-300 rounded text-sm flex-1"
                            />
                        </div>
                        <button type="submit"
                                className="mt-1 px-3 py-1 bg-[#d2e2ff] text-[#16366d] font-bold text-sm rounded hover:bg-[#dfe9fd] w-32">
                            Rămâi la curent
                        </button>
                        {isSubmitted && <p>Mulțumim pentru înscriere!</p>}
                        {error && <p className="text-red-500">Eroare: {error}</p>}
                    </form>
                    <div className="flex gap-2 mt-4">
                        <Link href="https://facebook.com/ONeduRomania"
                              className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] text-sm">
                            <FaFacebook />
                        </Link>
                        <Link href="https://instagram.com/onedu.romania"
                              className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] text-sm">
                            <FaInstagram />
                        </Link>
                        <Link href="https://tiktok.com/@onedu.ro"
                              className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] text-sm">
                            <FaTiktok />
                        </Link>
                        <Link href="https://linkedin.com/company/onedu"
                              className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] text-sm">
                            <FaLinkedinIn />
                        </Link>
                    </div>

                </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-500 mt-6">
                <div className="flex items-center">
                    <div className="flex gap-4">
                        <Link href="/privacy">Confidențialitate</Link>
                        <Link href="/terms">Termeni</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>Partener digitalizare</span>
                    <Link href="https://web365.ro" target="_blank">
                        <Image src="/logos/web365-logo.png" alt="Web365 Logo" width={80} height={80} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
