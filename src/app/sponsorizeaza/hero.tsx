// app/components/Hero/HeroSection.tsx
import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="py-16 px-8 bg-[#d0e3ff]">
            <div className="max-w-6xl mx-auto text-left">
                <h1 className="text-4xl font-bold text-black mb-4 ml-8">
                    Modernizăm educația împreună.
                </h1>
                <p className="text-lg text-gray-700 mb-8 ml-8">
                    Construim un hub de servicii digitale în educație pentru elevi, profesori, școli și părinți.
                    Modernizăm școlile din România. Ajută-ne să parcurgem harta spre o Românie digitală și modernă.
                </p>

                <div className="flex flex-wrap gap-8 ml-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-left">
                        <h2 className="text-2xl font-bold text-custom-blue mb-4">Anul 2024</h2>
                        <p className="text-gray-700 mb-6">
                            Completează contractul și investește în educația din România în doar 5 minute. Vei primi toate detaliile despre investiția ta după completarea contractului.
                        </p>
                        <Link href="/contract-2024" className="bg-custom-blue text-white px-5 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark">
                            Completează contractul
                        </Link>
                        <div className="flex gap-4 mt-4">
                            <Link href="/model-de-contract" className="text-custom-blue underline">
                                Model de contract
                            </Link>
                            <Link href="/informatii-suplimentare" className="text-custom-blue underline">
                                Informații suplimentare
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-left">
                        <h2 className="text-2xl font-bold text-custom-blue mb-4">Anul 2023</h2>
                        <p className="text-gray-700 mb-6">
                            Dacă sponsorizările făcute în 2023 nu au atins plafonul maxim stabilit de lege, completează contractul
                            cu suma rămasă și depune la ANAF Declarația 177 până la 25 decembrie.
                        </p>
                        <Link href="/contract-2023" className="bg-custom-blue text-white px-5 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark">
                            Completează contractul
                        </Link>
                        <div className="flex gap-4 mt-4">
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
