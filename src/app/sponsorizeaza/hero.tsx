// app/components/Hero/HeroSection.tsx
"use client";

import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="py-16 px-4 sm:px-8 bg-[#d0e3ff]">
            <div className="max-w-6xl mx-auto text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                    Modernizăm educația împreună.
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8">
                    Construim un hub de servicii digitale în educație pentru elevi, profesori, școli și părinți.
                    Modernizăm școlile din România. Ajută-ne să parcurgem harta spre o Românie digitală și modernă.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8">
                    {/* Card 1 */}
                    <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-left p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-custom-blue mb-4">
                            Anul 2024
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Completează contractul și investește în educația din România în doar 5 minute. Vei primi toate detaliile despre investiția ta după completarea contractului.
                        </p>
                        <Link href="/contract-2024" className="inline-block bg-custom-blue text-white px-5 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark">
                            Completează contractul
                        </Link>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                            <Link href="/model-de-contract" className="text-custom-blue underline">
                                Model de contract
                            </Link>
                            <Link href="/informatii-suplimentare" className="text-custom-blue underline">
                                Informații suplimentare
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-left p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-custom-blue mb-4">
                            Anul 2023
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Dacă sponsorizările făcute în 2023 nu au atins plafonul maxim stabilit de lege, completează contractul
                            cu suma rămasă și depune la ANAF Declarația 177 până la 25 decembrie.
                        </p>
                        <Link href="/contract-2023" className="inline-block bg-custom-blue text-white px-5 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark">
                            Completează contractul
                        </Link>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                            <Link href="/model-de-contract" className="text-custom-blue underline">
                                Model de contract
                            </Link>
                            <Link href="/informatii-suplimentare" className="text-custom-blue underline">
                                Informații suplimentare
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default HeroSection;
