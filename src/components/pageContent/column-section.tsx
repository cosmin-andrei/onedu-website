"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Card {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

interface ColumnSectionProps {
    sectionTitle: string;
    cards: Card[];
    backgroundColor?: string; // Opțional: permite personalizarea culorii de fundal
}

export const ColumnSection: React.FC<ColumnSectionProps> = ({
                                                                sectionTitle,
                                                                cards,
                                                                backgroundColor = "bg-blue-100", // Implicit un fundal albastru deschis
                                                            }) => {
    return (
        <section className={`py-12 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold mb-8">{sectionTitle}</h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg text-center"
                        >
                            <Image
                                width={500}
                                height={300}
                                src={card.imageSrc}
                                alt={card.imageAlt}
                                className="w-full h-auto"
                            />
                            <h3 className="text-xl font-bold mt-4">{card.title}</h3>
                            <p className="text-gray-600 px-4 mt-2">{card.description}</p>
                            <Link
                                href={card.linkHref}
                                className="inline-block mt-4 mb-6 px-4 py-2 text-custom-blue font-semibold hover:text-custom-blue-dark transition-colors"
                            >
                                {card.linkText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ColumnSection;
